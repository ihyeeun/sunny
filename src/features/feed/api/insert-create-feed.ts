import supabase from "@shared/lib/supabase";
import { deleteFeed } from "@features/feed/api/delete-feed";
import { updateFeed } from "@features/feed/api/update-feed";
import { BUCKET_UPLOAD_FEED_IMAGE } from "@features/feed/constants/storage";

export async function insertCreateFeedOnlyContent(content: string) {
  const { data, error } = await supabase
    .from("feed")
    .insert({ content })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// 이미지를 같이 올릴 때 사용하는 함수.
export async function insertFeed({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  const feed = await insertCreateFeedOnlyContent(content);

  if (images.length === 0) {
    return feed;
  }

  try {
    // 2. 비동기 함수들이 병렬로 실행되도록
    // 이미지를 스토리지에 업로드해서 URL들을 받아오는 거 아닌가
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtenstion = image.name.split(".").pop() ?? "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtenstion}`;
        const filePath = `${userId}/${feed.id}/${fileName}`;

        return uploadImages({ file: image, filePath });
      }),
    );

    //3. 포스트 테이블
    const updatedFeedImages = await updateFeed({
      id: feed.id,
      image_urls: imageUrls,
    });

    return updatedFeedImages;
  } catch (error) {
    // 이미지를 업로드하거나 업데이트 하는 과정에서 오류가 발생하게되면 임의 생성된 피드를 삭제
    await deleteFeed(feed.id);
    throw error;
  }
}

export async function uploadImages({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_UPLOAD_FEED_IMAGE)
    .upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_UPLOAD_FEED_IMAGE).getPublicUrl(data.path);

  //현재 업로드한 이미지의 주소를 반환
  return publicUrl;
}
