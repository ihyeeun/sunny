import supabase from "@shared/lib/supabase";
import { makeRandomNickname } from "@shared/utils/make-random-nickname";

export async function postCreateProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({ id: userId, nickname: makeRandomNickname() })
    .select()
    .single();

  if (error) throw error;
  return data;
}
