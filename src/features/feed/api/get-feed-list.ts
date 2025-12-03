import supabase from "@shared/lib/supabase";

export async function getFeedList() {
  const { data, error } = await supabase
    .from("feed")
    .select("*, author: profile!author_id (avatar_image, nickname)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
