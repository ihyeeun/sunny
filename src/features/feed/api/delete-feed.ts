import supabase from "@shared/lib/supabase";
import { BUCKET_UPLOAD_FEED_IMAGE } from "@features/feed/constants/storage";

export async function deleteFeed(feedId: number) {
  const { data, error } = await supabase
    .from("feed")
    .delete()
    .eq("id", feedId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteImagesInPath(path: string) {
  const { data: imageFiles, error: fetchImageFilesError } =
    await supabase.storage.from(BUCKET_UPLOAD_FEED_IMAGE).list(path);

  if (fetchImageFilesError) throw fetchImageFilesError;

  const { error: removeError } = await supabase.storage
    .from(BUCKET_UPLOAD_FEED_IMAGE)
    .remove(imageFiles.map((file) => `${path}/${file.name}`));

  if (removeError) throw removeError;
}
