import type { CardRow } from "./cards.types";

/**
 * 카드 단위 유틸의 기본 결과 타입
 * - 생성 / 저장 / 완료 등에서 공통 사용
 */
export type CardIdResult = {
  cardId: CardRow["id"];
};
