import supabase from "@shared/lib/supabase";

export async function updateFeedLikeToggle({
  feedId,
  userId,
}: {
  feedId: number;
  userId: string;
}) {
  const { data, error } = await supabase.rpc("toggle_feed_like", {
    p_feed_id: feedId,
    p_user_id: userId,
  });

  if (error) throw error;

  return data;
}
