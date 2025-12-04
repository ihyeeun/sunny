import supabase from "@shared/lib/supabase";

export async function getFeedList({ from, to }: { from: number; to: number }) {
  const { data, error } = await supabase
    .from("feed")
    .select("*, author: profile!author_id (avatar_image, nickname)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data;
}
