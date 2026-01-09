import type {
  CloseButtonProps,
  BackButtonProps,
} from "../components/ui/Header";

/** Creator 헤더 종류 */
export type CreatorHeaderKind = "close" | "back" | "progress-exit";

/** 헤더 공통 타입 */
interface CreatorHeaderBase {
  kind: CreatorHeaderKind;
}

/** 1) close 헤더: 마지막 단계 */
export interface CreatorCloseHeaderMeta extends CreatorHeaderBase {
  kind: "close";
  headerProps?: CloseButtonProps;

  /**
   * close 동작 정책
   * - "close": window.close() 시도
   */
}

/** 2) back 헤더: PIN(C2)처럼 기존 탭에서 뒤로 이동 */
export interface CreatorBackHeaderMeta extends CreatorHeaderBase {
  kind: "back";
  headerProps?: BackButtonProps;
}

/** 3) progress + exit(메인으로/닫기) 헤더: C3~C6 */
export interface CreatorProgressExitHeaderMeta extends CreatorHeaderBase {
  kind: "progress-exit";
  value: number;

  /**
   * exit 동작 정책
   * - C1 화면으로 이동
   */
}

/** 최종 union */
export type CreatorHeaderMeta =
  | CreatorCloseHeaderMeta
  | CreatorBackHeaderMeta
  | CreatorProgressExitHeaderMeta;

export interface CreatorLayoutMeta {
  isFullBleed: boolean;
}
