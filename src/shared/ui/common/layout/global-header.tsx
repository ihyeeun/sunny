import { SunIcon, SunMoon } from "lucide-react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import { ProfileButton } from "@features/user";

import logo from "@/assets/sunny-transparency.png";

export default function GlobalHeader() {
  return (
    <header className="h-10 border-b">
      <div className="layout-container flex h-full justify-between">
        <Link to={PATH.ROOT} className="flex items-center gap-1">
          <img
            className="h-7"
            src={logo}
            alt="Sunny sns 서비스의 로고 이미지, 해가 걸어가고 있는 모양이다."
          />
          <p className="font-bold">Sunny</p>
        </Link>
        <div className="text-muted-foreground flex items-center gap-1">
          <div className="hover:bg-muted cursor-pointer rounded-full p-2">
            <SunMoon className="size-4" />
          </div>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
