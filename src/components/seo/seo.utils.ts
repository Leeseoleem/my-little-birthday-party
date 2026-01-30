/**
 * 상대 경로를 절대 URL로 변환합니다.
 * 이미 절대 URL인 경우 그대로 반환합니다.
 *
 * @param pathOrUrl - 변환할 경로 또는 URL
 * @param origin - 기본 origin (예: https://example.com)
 * @returns 절대 URL
 *
 * @example
 * toAbsoluteUrl('/cards/123', 'https://example.com')
 * // => 'https://example.com/cards/123'
 *
 * toAbsoluteUrl('https://cdn.com/image.jpg', 'https://example.com')
 * // => 'https://cdn.com/image.jpg'
 */
export function toAbsoluteUrl(pathOrUrl: string, origin: string): string {
  // 빈 문자열 체크
  if (!pathOrUrl || !origin) {
    return origin || "";
  }

  // 이미 절대 URL이면 그대로 반환
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  // origin의 trailing slash 제거
  const cleanOrigin = origin.replace(/\/+$/, "");

  // path의 leading slash 보장
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${cleanOrigin}${cleanPath}`;
}
