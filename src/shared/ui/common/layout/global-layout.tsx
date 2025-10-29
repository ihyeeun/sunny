import { Outlet } from "react-router";

import GlobalFooter from "./global-footer";
import GlobalHeader from "./global-header";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <h1 className="visuallyhidden">Sunny 한국</h1> */}
      <GlobalHeader />
      <main className="layout-container flex-1 border-x py-6">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
