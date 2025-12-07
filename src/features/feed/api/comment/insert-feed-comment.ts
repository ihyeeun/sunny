import supabase from "@shared/lib/supabase";

export async function insertFeedComment({
  feedId,
  content,
  parentCommentId,
  rootCommentId,
}: {
  feedId: number;
  content: string;
  parentCommentId?: number;
  rootCommentId?: number;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      feed_id: feedId,
      content,
      parent_comment_id: parentCommentId,
      root_comment_id: rootCommentId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
