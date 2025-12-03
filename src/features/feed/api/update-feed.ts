import supabase from "@shared/lib/supabase";
import type { FeedEntity } from "@shared/types/database.types";

export async function updateFeed(feed: Partial<FeedEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("feed")
    .update(feed)
    .eq("id", feed.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
