import supabase from "@shared/lib/supabase";

export async function postCreateFeed(content: string) {
  const { data, error } = await supabase.from("feed").insert({ content });

  if (error) {
    throw error;
  }

  return data;
}
