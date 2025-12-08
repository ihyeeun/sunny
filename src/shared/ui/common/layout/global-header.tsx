import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import { useSessionState } from "@shared/store/session";
import { useTheme } from "@shared/store/theme";
import { ProfileButton } from "@features/user";
import { useProfileDataQuery } from "@features/user/hooks/queries/use-profile-data-query";

import ThemeButton from "./theme-button";

import lightLogo from "@/assets/sunny-transparency.png";
import darkLogo from "@/assets/sunny-yellow-transparency.png";

export default function GlobalHeader() {
  const session = useSessionState();
  const theme = useTheme();
  const { data: profile } = useProfileDataQuery(session?.user.id);

  return (
    <header className="h-10 border-b">
      <div className="layout-container flex h-full justify-between">
        <Link
          to={PATH.ROOT}
          className="hover:bg-muted flex items-center gap-1 rounded-md pr-1"
        >
          <img
            className="h-7"
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Sunny sns 서비스의 로고 이미지, 해가 걸어가고 있는 모양이다."
          />
          <p className="font-bold">Sunny</p>
        </Link>
        <div className="text-muted-foreground flex items-center gap-1">
          <ThemeButton />
          <ProfileButton session={session} profile={profile ?? null} />
        </div>
      </div>
    </header>
  );
}
