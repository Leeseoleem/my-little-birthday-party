import { CARD_ERROR } from "./cardErrorCodes";

type NavigateLike = {
  (options: { to: string }): void;
};

export function handleCardError(err: unknown, navigate: NavigateLike) {
  if (!(err instanceof Error)) return false;

  switch (err.message) {
    case CARD_ERROR.CARD_ID_MISSING: {
      alert("카드 정보를 찾을 수 없어요. 처음부터 다시 시작해 주세요.");
      navigate({ to: "/creator" });
      return true;
    }

    default:
      return false;
  }
}
