export type ReturnToPartySearch = {
  returnTo?: "party";
};

// party 페이지로 돌아가야 하는지 검증하는 함수
export const validateReturnToPartySearch = (
  search: Record<string, unknown>,
): ReturnToPartySearch => {
  return {
    returnTo: search.returnTo === "party" ? "party" : undefined,
  };
};
