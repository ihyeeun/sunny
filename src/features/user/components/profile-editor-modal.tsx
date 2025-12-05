import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";

import { Button, Dialog, Input } from "@shared/ui/shadcn";
import { DialogContent, DialogTitle } from "@shared/ui/shadcn/dialog";
import { useProfileUpdateMutation } from "@features/user/hooks/mutations/use-profile-update-mutation";
import { useProfileEditorModal } from "@features/user/store/profile-editor";

import defaultAvartar from "@/assets/default-avatar.png";

interface Image {
  file: File | null;
  previewUrl: string;
}

export function ProfileEditorModal() {
  const {
    isOpen,
    profile,
    actions: { modalClose },
  } = useProfileEditorModal();
  const { mutate: updateProfile, isPending: updateProfileIsPending } =
    useProfileUpdateMutation({
      onSuccess: () => {
        modalClose();
        toast.success("프로필 수정 성공!", { position: "top-center" });
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다. 다시 시도해주세요.", {
          position: "top-center",
        });
        console.log("프로필 수정 실패", error);
      },
    });
  const [avatarImage, setAvatarImage] = useState<Image | null>({
    file: null,
    previewUrl: profile?.avatar_image ?? defaultAvartar,
  });
  const [nickname, setNickname] = useState(profile?.nickname);
  const [bio, setBio] = useState(profile?.bio);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage({
        file: null,
        previewUrl: profile?.avatar_image ?? defaultAvartar,
      });
    }
  }, [isOpen, profile]);

  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);
    }
  }, [isOpen]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({ file, previewUrl: URL.createObjectURL(file) });
  };

  const handleProfileUpdateButtonClick = () => {
    if (nickname?.trim() === "" || !profile) return;
    updateProfile({
      userId: profile.id,
      updateData: {
        nickname,
        bio,
        avatarImageFile: avatarImage?.file ?? undefined,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={modalClose}>
      <DialogContent>
        <DialogTitle className="text-center">프로필 수정</DialogTitle>
        <div className="flex flex-col items-center justify-center gap-2 border py-5">
          <div
            className="relative w-fit cursor-pointer"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleSelectImage}
            />
            <img
              src={avatarImage?.previewUrl}
              className="size-20 rounded-full border object-cover"
            />
            <div className="absolute right-0 bottom-0 size-fit rounded-full p-1">
              <ImageUp
                strokeWidth={1}
                className="text-muted-foreground/20 size-4 bg-white"
              />
            </div>
          </div>

          <div>
            <p>닉네임</p>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div>
            <p>소개</p>
            <Input value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <Button
            onClick={handleProfileUpdateButtonClick}
            disabled={updateProfileIsPending}
          >
            수정
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
