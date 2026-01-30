import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// env가 비어있다면 Error
if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Missing Supabase env: VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY",
  );
}

// supabase 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
