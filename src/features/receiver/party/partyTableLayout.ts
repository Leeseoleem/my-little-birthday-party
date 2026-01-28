export const PARTY_TABLE_BASE = {
  width: 800,
  height: 470,
} as const;

export function pxToPercentX(px: number) {
  return `${(px / PARTY_TABLE_BASE.width) * 100}%`;
}

export function pxToPercentY(px: number) {
  return `${(px / PARTY_TABLE_BASE.height) * 100}%`;
}
