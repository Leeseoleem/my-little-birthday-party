import { supabase } from "../supabase";

// 동시 호출(레이스 컨디션) 방지용 in-flight Promise 캐시
let inFlight: ReturnType<typeof ensureAnonSessionInner> | null = null;

async function ensureAnonSessionInner() {
  // 현재 session 조회
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

export async function ensureAnonSession() {
  if (!inFlight) {
    inFlight = ensureAnonSessionInner().finally(() => {
      // 성공/실패와 무관하게 다음 호출을 위해 캐시를 비웁니다.
      inFlight = null;
    });
  }

  return inFlight;
}
