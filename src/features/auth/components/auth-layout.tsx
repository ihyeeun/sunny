import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <div className="flex justify-center border">
        <Outlet />
      </div>
    </div>
  );
}
