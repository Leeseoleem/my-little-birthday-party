/**
 * 생일 핀 번호(예: "1014")를 "10-14" 형식으로 변환합니다.
 */
export function formatPinBirth(pinBirth: string): string {
  // 방어: 길이가 4가 아니면 그대로 반환
  if (pinBirth.length !== 4) {
    return pinBirth;
  }

  const month = pinBirth.slice(0, 2);
  const day = pinBirth.slice(2, 4);

  return `${month}-${day}`;
}
