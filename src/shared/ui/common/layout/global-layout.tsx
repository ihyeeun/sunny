import { Outlet } from "react-router";

import GlobalHeader from "./global-header";

export default function GlobalLayout() {
  return (
    <div>
      {/* <h1 className="visuallyhidden">Sunny 한국</h1> */}
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
}
