import { SunIcon } from "lucide-react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";

import avatar from "@/assets/default-avatar.png";
import logo from "@/assets/sunny-transparency.png";

export default function GlobalHeader() {
  return (
    <header className="h-10 border-b">
      <div className="m-auto flex h-full w-full max-w-250 justify-between px-4">
        <Link to={PATH.ROOT} className="flex items-center gap-1">
          <img
            className="h-7"
            src={logo}
            alt="Sunny sns 서비스의 로고 이미지, 해가 걸어가고 있는 모양이다."
          />
          <p className="font-bold">Sunny</p>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hover:bg-muted cursor-pointer rounded-full p-2">
            <SunIcon />
          </div>
          <img
            className="h-7"
            src={avatar}
            alt="Sunny sns 서비스의 아바타 이미지, 담요를 두르고 있는 사람이 노트북을 하는 중인 모양이다."
          />
        </div>
      </div>
    </header>
  );
}
