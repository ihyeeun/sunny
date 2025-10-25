import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <p>여기는 인증인가 관련 페이지 입니다.</p>
      <Outlet />
    </div>
  );
}
