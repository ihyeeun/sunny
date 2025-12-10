import { PopoverClose } from "@radix-ui/react-popover";
import type { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight, DoorOpen, UserCog } from "lucide-react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import type { ProfileEntity } from "@shared/types/database.types";
import { Popover } from "@shared/ui/shadcn";
import { PopoverContent, PopoverTrigger } from "@shared/ui/shadcn/popover";
import { signOut } from "@features/auth/api/sign-out";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

import defaultAvatar from "@/assets/default-avatar.png";

interface ProfileButtonProps {
  session: Session | null;
  profile: ProfileEntity | null;
}

export function ProfileButton({ session, profile }: ProfileButtonProps) {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    signOut();
    queryClient.removeQueries({ queryKey: FEED_QUERY_KEYS.feed.all() });
  };

  return (
    <div className="hover:bg-muted rounded-full">
      {session ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              aria-label="프로필 메뉴 열기"
              className="flex cursor-pointer items-center"
            >
              <img
                className="size-7 rounded-full object-cover"
                src={profile?.avatar_image ?? defaultAvatar}
                alt="사용자 프로필 이미지"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="text-muted-foreground flex w-fit cursor-pointer flex-col p-0 text-center text-sm">
            <PopoverClose asChild className="hover:bg-muted px-4 py-2">
              <Link
                to={PATH.PROFILE.DETAIL_LINK(session.user.id)}
                className="flex items-center gap-2"
                aria-label="내 프로필 페이지로 이동"
              >
                <UserCog
                  className="size-3"
                  strokeWidth={1}
                  aria-hidden="true"
                />
                프로필
              </Link>
            </PopoverClose>
            <PopoverClose asChild className="hover:bg-muted px-4 py-2">
              <button
                className="flex cursor-pointer items-center gap-2"
                onClick={handleSignOut}
              >
                <span>
                  <DoorOpen
                    className="size-3"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                </span>
                로그아웃
              </button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          to={PATH.AUTH.SIGN_IN}
          className="hover:bg-muted flex cursor-pointer items-center gap-0.5 rounded-full p-2 text-[12px]"
          aria-label="로그인 페이지로 이동"
        >
          Sign in
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
