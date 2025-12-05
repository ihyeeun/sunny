import { useSessionState } from "@shared/store/session";
import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { Button } from "@shared/ui/shadcn";
import { ProfileEditorModal } from "@features/user/components/profile-editor-modal";
import { useProfileDataQuery } from "@features/user/hooks/queries/use-profile-data-query";
import { useOpenProfileEditorModal } from "@features/user/store/profile-editor";

import defaultAvartar from "@/assets/default-avatar.png";

export default function ProfileInfo({ userId }: { userId: string }) {
  const session = useSessionState();
  const isOpen = useOpenProfileEditorModal();

  const {
    data: profile,
    error: fetchProfileError,
    isPending: fetchProfilePending,
  } = useProfileDataQuery(userId);

  if (fetchProfileError) return <Fallback />;
  if (fetchProfilePending) return <GlobalLoaded />;

  const isMine = session?.user.id === userId;

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border p-4 sm:flex-row sm:items-center">
      <img
        src={profile.avatar_image ?? defaultAvartar}
        className="size-20 rounded-full border object-cover sm:size-28"
      />
      <div className="flex flex-col border text-center sm:gap-1 sm:text-left">
        <p className="text-sm font-semibold sm:text-base">{profile.nickname}</p>
        <p className="text-muted-foreground text-[12px] sm:text-sm">
          {profile.bio}
        </p>
      </div>
      {isMine && (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="cursor-pointer"
            onClick={() => isOpen(profile)}
          >
            프로필 수정
          </Button>
          <ProfileEditorModal />
        </>
      )}
    </div>
  );
}
