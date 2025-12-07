import supabase from "@shared/lib/supabase";

export async function getComments(feedId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (avatar_image, nickname)")
    .eq("feed_id", feedId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}
