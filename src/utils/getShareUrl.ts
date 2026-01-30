export function getShareUrl(cardId: string): string {
  /**
   * 상위 함수 내에서 검증하므로 중복 위험이 있어 주석 처리
   * if (!cardId) {
   * throw new Error("cardId가 없습니다.");
   * }
   */

  // 기본은 현재 도메인(origin)을 그대로 사용
  const originUrl = typeof window !== "undefined" ? window.location.origin : "";

  // production에서만 공식 도메인이 있으면 그걸 우선 적용
  const isProd = import.meta.env.MODE === "production";
  const prodBaseUrl = (
    import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined
  )?.trim();

  const baseUrl = (isProd && prodBaseUrl ? prodBaseUrl : originUrl) || "";

  if (!baseUrl) {
    throw new Error("baseUrl을 결정할 수 없습니다.");
  }

  return `${baseUrl}/r/${encodeURIComponent(cardId)}`;
}
