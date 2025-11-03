import { Navigate, Outlet } from "react-router";

import { PATH } from "@shared/constants/path";
import { useSessionState } from "@shared/store/session";

export default function MemberGuard() {
  const session = useSessionState();

  if (!session) return <Navigate to={PATH.AUTH.SIGN_IN} replace={true} />;

  return <Outlet />;
}
