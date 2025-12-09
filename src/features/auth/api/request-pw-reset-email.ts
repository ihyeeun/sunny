import { PATH } from "@shared/constants/path";
import supabase from "@shared/lib/supabase";

export async function requestPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_CLIENT_URL}${PATH.AUTH.RESET_PASSWORD}`,
  });

  if (error) throw error;
  return data;
}
