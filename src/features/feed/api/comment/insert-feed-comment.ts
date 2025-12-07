import supabase from "@shared/lib/supabase";

export async function insertFeedComment({
  feedId,
  content,
}: {
  feedId: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({ feed_id: feedId, content })
    .select()
    .single();

  if (error) throw error;
  return data;
}
