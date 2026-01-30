import { getSiteOrigin } from "./getSiteOrigin";

export function getShareUrl(cardId: string): string {
  const baseUrl = getSiteOrigin();

  return `${baseUrl}/r/${encodeURIComponent(cardId)}`;
}
