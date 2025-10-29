import { Route, Routes } from "react-router";

import { GlobalLayout } from "@shared/ui/common";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        {/* 모든 페이지에 global Layout 을 적용하기 위해 이 route 안에 페이지 라우팅 */}
      </Route>
    </Routes>
  );
}

export default App;
