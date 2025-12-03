import supabase from "@shared/lib/supabase";

export async function getFeedById(feedId: number) {
  const { data, error } = await supabase
    .from("feed")
    .select("*, author: profile!author_id (avatar_image, nickname)")
    .eq("id", feedId)
    .single();

  if (error) throw error;
  return data;
}
