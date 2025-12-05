import supabase from "@shared/lib/supabase";

export async function getFeedList({
  from,
  to,
  userId,
  authorId,
}: {
  from: number;
  to: number;
  userId?: string;
  authorId?: string;
}) {
  const query = supabase
    .from("feed")
    .select(
      "*, author: profile!author_id (avatar_image, nickname), myLiked: feedLike!feed_id (id, feed_id, user_id)",
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (userId) query.eq("feedLike.user_id", userId);
  if (authorId) query.eq("author_id", authorId);

  const { data, error } = await query;
  if (error) throw error;

  return data.map((feed) => {
    const myLikedArray =
      feed.myLiked?.filter((like) => like.user_id === userId) ?? [];

    return {
      ...feed,
      myLiked: myLikedArray,
      isFeedLiked: myLikedArray.length > 0,
    };
  });
}
