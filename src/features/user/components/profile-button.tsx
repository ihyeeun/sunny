import { PopoverClose } from "@radix-ui/react-popover";
import type { Session } from "@supabase/supabase-js";
import { ChevronRight, DoorOpen, UserCog } from "lucide-react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import type { ProfileEntity } from "@shared/types/database.types";
import { Popover } from "@shared/ui/shadcn";
import { PopoverContent, PopoverTrigger } from "@shared/ui/shadcn/popover";
import { signOut } from "@features/auth/api/sign-out";

import defaultAvatar from "@/assets/default-avatar.png";

interface ProfileButtonProps {
  session: Session | null;
  profile: ProfileEntity | null;
}

export function ProfileButton({ session, profile }: ProfileButtonProps) {
  return (
    <div className="hover:bg-muted rounded-full">
      {session ? (
        <Popover>
          <PopoverTrigger className="flex cursor-pointer items-center">
            <img
              className="size-8 rounded-full object-cover"
              src={profile?.avatar_image ?? defaultAvatar}
              alt="Sunny sns 서비스의 아바타 이미지, 담요를 두르고 있는 사람이 노트북을 하는 중인 모양이다."
            />
          </PopoverTrigger>
          <PopoverContent className="text-muted-foreground flex w-fit cursor-pointer flex-col p-0 text-center text-sm">
            <PopoverClose asChild className="hover:bg-muted px-4 py-2">
              <Link
                to={PATH.PROFILE.DETAIL_LINK(session.user.id)}
                className="flex items-center gap-2"
              >
                <UserCog className="size-3" />
                프로필
              </Link>
            </PopoverClose>
            <PopoverClose asChild className="hover:bg-muted px-4 py-2">
              <p className="flex items-center gap-2" onClick={signOut}>
                <span>
                  <DoorOpen className="size-3" />
                </span>
                로그아웃
              </p>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          to={PATH.AUTH.SIGN_IN}
          className="hover:bg-muted flex cursor-pointer items-center gap-0.5 rounded-full p-2 text-[12px]"
        >
          Sign in
          <ChevronRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
