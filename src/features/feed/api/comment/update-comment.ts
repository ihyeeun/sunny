import supabase from "@shared/lib/supabase";

export async function updateComment({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .update({ content })
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
