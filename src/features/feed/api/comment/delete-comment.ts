import supabase from "@shared/lib/supabase";

export async function deleteComment(commentId: number) {
  const { data, error } = await supabase
    .from("comment")
    .delete()
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
