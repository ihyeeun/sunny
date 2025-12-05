import supabase from "@shared/lib/supabase";
import { deleteImagesInPath } from "@features/feed/api/delete-feed";
import { uploadImages } from "@features/feed/api/insert-create-feed";
import { PATH_PROFILE } from "@features/user/constants/path";

interface UpdateProfileDto {
  userId: string;
  updateData: {
    nickname?: string;
    bio?: string;
    avatarImageFile?: File;
  };
}

export async function updateProfile({ userId, updateData }: UpdateProfileDto) {
  // 1. 기존 아바타 이미지 삭제
  if (updateData.avatarImageFile) {
    await deleteImagesInPath(PATH_PROFILE.DELETE_AVATAR_OF_USER(userId));
  }

  // 2. 새로운 아바타 이미지 업로드
  let newAvatarImageUrl;
  if (updateData.avatarImageFile) {
    const fileExtenstion =
      updateData.avatarImageFile.name.split(".").pop() ?? "webp";
    const filePath = `${PATH_PROFILE.DELETE_AVATAR_OF_USER(userId)}/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtenstion}`;

    newAvatarImageUrl = await uploadImages({
      file: updateData.avatarImageFile,
      filePath,
    });
  }

  // 3. 프로필 업데이트
  const { data, error } = await supabase
    .from("profile")
    .update({
      nickname: updateData.nickname,
      bio: updateData.bio,
      avatar_image: newAvatarImageUrl,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
