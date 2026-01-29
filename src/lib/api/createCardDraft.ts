import { supabase } from "../supabase";

export type CreateCardDraftInput = {
  inviteeName: string;
  inviteeBirthDate: string; // "MMDD"
};

export async function createCardDraft(input: CreateCardDraftInput) {
  const name = input.inviteeName.trim();
  const birth = input.inviteeBirthDate.trim();

  // 입력 검증 방어용
  if (!name) throw new Error("이름을 입력해 주세요.");
  if (!/^\d{4}$/.test(birth)) {
    throw new Error("생년월일은 숫자 4자리(MMDD)로 입력해 주세요.");
  }

  const payload = {
    receiver_name: name,
    pin_birth: birth,
    status: "draft",
    is_completed: false,
  };

  const { data, error } = await supabase
    .from("cards")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;

  return { cardId: data.id as string };
}
