export function getShareUrl(cardId: string) {
  if (!cardId) {
    throw new Error("cardId가 없습니다.");
  }

  // 기본은 현재 도메인(origin)을 그대로 사용
  const originUrl = window.location.origin;

  // production에서만 공식 도메인이 있으면 그걸 우선 적용
  const isProd = import.meta.env.MODE === "production";
  const prodBaseUrl = (
    import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined
  )?.trim();

  const baseUrl = isProd && prodBaseUrl ? prodBaseUrl : originUrl;

  return `${baseUrl}/r/${cardId}`;
}
