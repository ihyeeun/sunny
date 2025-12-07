import supabase from "@shared/lib/supabase";

export async function insertFeedComment({
  feedId,
  content,
  parentCommentId,
}: {
  feedId: number;
  content: string;
  parentCommentId?: number;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({ feed_id: feedId, content, parent_comment_id: parentCommentId })
    .select()
    .single();

  if (error) throw error;
  return data;
}
