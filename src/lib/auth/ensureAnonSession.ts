import { supabase } from "../supabase";

export async function ensureAnonSession() {
  // session 조회
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;

  const user = sessionData.session?.user;
  // 이미 세션이 있다면 그대로 반환
  if (user) return user;

  // 세션이 없는 경우 익명 로그인 실행
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) throw error;

  if (!data.user) {
    throw new Error("Anonymous sign-in succeeded but user is missing");
  }

  return data.user;
}
