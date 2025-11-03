import { Navigate, Outlet } from "react-router";

import { PATH } from "@shared/constants/path";
import { useSessionState } from "@shared/store/session";

export default function GuestGuard() {
  const session = useSessionState();

  if (session) return <Navigate to={PATH.ROOT} replace={true} />;

  return <Outlet />;
}
