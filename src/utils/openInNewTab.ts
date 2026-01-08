/**
 * 새 탭(새 창)으로 URL을 여는 유틸 함수
 */
export const openInNewTab = (url: string, features?: string) => {
  const base = "noopener,noreferrer";
  const finalFeatures = features ? `${features},${base}` : base;

  window.open(url, "_blank", finalFeatures);
};
