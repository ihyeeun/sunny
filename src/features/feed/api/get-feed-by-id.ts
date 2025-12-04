import supabase from "@shared/lib/supabase";

export async function getFeedById({
  feedId,
  userId,
}: {
  feedId: number;
  userId?: string;
}) {
  let query = supabase
    .from("feed")
    .select(
      "*, author: profile!author_id (avatar_image, nickname), myLiked: feedLike!feed_id (id, feed_id, user_id, created_at)",
    )
    .eq("id", feedId);

  if (userId) {
    query = query.eq("feedLike.user_id", userId);
  }

  const { data, error } = await query.single();
  if (error) throw error;

  return {
    ...data,
    isFeedLiked: Array.isArray(data.myLiked) && data.myLiked.length > 0,
  };
}
