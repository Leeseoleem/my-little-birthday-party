export function getSiteOrigin(): string {
  const isProd = import.meta.env.MODE === "production";
  const prodBaseUrl = (
    import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined
  )?.trim();

  const origin =
    (isProd && prodBaseUrl) ||
    (typeof window !== "undefined" ? window.location.origin : "");

  if (!origin) {
    throw new Error("사이트 경로가 없습니다.");
  }

  return origin.replace(/\/+$/, "");
}
