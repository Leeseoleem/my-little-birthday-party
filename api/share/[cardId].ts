import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

/**
 * HTML 주입 방지용 최소 이스케이프
 * - OG/meta에 들어가는 문자열은 반드시 escape 처리
 */
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * 요청 헤더 기반 origin 구성 (SITE_ORIGIN 없을 때 fallback)
 * - Vercel 프록시 환경에서 x-forwarded-* 헤더를 우선 사용
 */
function getOrigin(req: VercelRequest) {
  const proto =
    (req.headers["x-forwarded-proto"] as string) ||
    (req.headers["x-forwarded-protocol"] as string) ||
    "https";

  const host = (req.headers["x-forwarded-host"] as string) || req.headers.host;

  return `${proto}://${host}`;
}

/**
 * /api/share/:cardId 라우팅에서 cardId를 안전하게 추출
 * - VercelRequest의 query는 string | string[] | undefined 케이스가 섞일 수 있음
 */
function getFirstQueryParam(value: unknown) {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return "";
}

/**
 * 공유봇(Open Graph)용 완성 HTML을 생성
 * - 봇은 head만 읽고, 사람 브라우저는 즉시 /r/:cardId로 이동
 */
function buildHtml(params: {
  title: string;
  description: string;
  ogImageAbs: string;
  shareUrl: string;
  redirectUrl: string;
}) {
  const { title, description, ogImageAbs, shareUrl, redirectUrl } = params;

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeImg = escapeHtml(ogImageAbs);
  const safeShareUrl = escapeHtml(shareUrl);
  const safeRedirectUrl = escapeHtml(redirectUrl);

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}" />

  <!-- Open Graph -->
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:url" content="${safeShareUrl}" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeImg}" />

  <!-- 검색 차단: vercel.json의 X-Robots-Tag와 함께 이중 안전망 -->
  <meta name="robots" content="noindex,nofollow" />

  <!-- 사람 브라우저 즉시 이동 -->
  <meta http-equiv="refresh" content="0; url=${safeRedirectUrl}" />
</head>
<body>
  <noscript>
    <p>이동 중입니다. 자동으로 이동하지 않으면 아래 링크를 눌러주세요.</p>
    <p><a href="${safeRedirectUrl}">${safeRedirectUrl}</a></p>
  </noscript>

  <script>
    // 히스토리 깔끔하게 replace
    location.replace(${JSON.stringify(redirectUrl)});
  </script>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cardId = getFirstQueryParam(req.query.cardId).trim();

  if (!cardId) {
    res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Missing cardId");
    return;
  }

  // 절대 URL은 env로 고정하는 편이 가장 안전 (권장)
  // - Vercel env에 SITE_ORIGIN을 등록해두면 프리뷰/커스텀 도메인에서도 일관됨
  const origin = process.env.SITE_ORIGIN || getOrigin(req);

  const shareUrl = `${origin}/share/${encodeURIComponent(cardId)}`;
  const redirectUrl = `${origin}/r/${encodeURIComponent(cardId)}`;

  // Vercel Functions에서도 env로 주입되어 있어야 함 (Vercel Project Settings에서 등록)
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  // 기본 OG (DB 조회 실패 시 fallback)
  const fallbackTitle = "나의 작은 생일 파티";
  const fallbackDesc = "생일 파티 초대장이 도착했어요.";
  const ogImageAbs = `${origin}/og/og-birthday-card.png`;

  try {
    // env 누락이면 DB 조회 없이 fallback HTML 반환
    if (!supabaseUrl || !supabaseAnonKey) {
      const html = buildHtml({
        title: fallbackTitle,
        description: fallbackDesc,
        ogImageAbs,
        shareUrl,
        redirectUrl,
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      // OG는 갱신/디버그가 잦아서 초기에는 no-store가 가장 안전
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
      res.end(html);
      return;
    }

    // anon key 기반 클라이언트: RLS 정책이 허용해야 조회됨
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    // published 카드만 대상으로 OG 이름을 노출
    const { data, error } = await supabase
      .from("cards")
      .select("receiver_name")
      .eq("id", cardId)
      .eq("status", "published")
      .maybeSingle();

    // 조회 실패/미노출 시에는 안전하게 fallback 이름 사용
    const receiverName =
      (!error && data?.receiver_name ? String(data.receiver_name) : "") ||
      "당신";

    // React head()와 문구 통일
    const title = `${receiverName}님을 위한 생일 파티 초대장 🎉`;
    const description = `${receiverName}님을 특별한 생일 파티에 초대했어요.`;

    const html = buildHtml({
      title,
      description,
      ogImageAbs,
      shareUrl,
      redirectUrl,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // OG는 갱신/디버그가 잦아서 초기에는 no-store가 가장 안전
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    res.end(html);
  } catch {
    // 예외 시에도 html로 반환
    const html = buildHtml({
      title: fallbackTitle,
      description: fallbackDesc,
      ogImageAbs,
      shareUrl,
      redirectUrl,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    res.end(html);
  }
}
