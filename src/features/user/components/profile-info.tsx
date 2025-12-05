import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { useProfileDataQuery } from "@features/user/hooks/queries/use-profile-data-query";

import defaultAvartar from "@/assets/default-avatar.png";

export default function ProfileInfo({ userId }: { userId: string }) {
  const {
    data: profile,
    error: fetchProfileError,
    isPending: fetchProfilePending,
  } = useProfileDataQuery(userId);

  if (fetchProfileError) return <Fallback />;
  if (fetchProfilePending) return <GlobalLoaded />;

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border p-4 sm:flex-row sm:items-center">
      <img
        src={profile.avatar_image ?? defaultAvartar}
        className="size-20 rounded-full border object-cover sm:size-28"
      />
      <div className="flex flex-col text-center sm:gap-1 sm:text-left">
        <p className="text-sm font-semibold sm:text-base">{profile.nickname}</p>
        <p className="text-muted-foreground text-[12px] sm:text-sm">
          {profile.bio}
          // TODO bio text range limit
        </p>
      </div>
    </div>
  );
}
