import supabase from "@shared/lib/supabase";

export async function getComments(feedId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (avatar_image, nickname)")
    .eq("feed_id", feedId)
    .order("created_at", { ascending: false }); // 댓글에 작성한 프로필을 다 불러오는거

  if (error) throw error;
  return data;
}
