import { AuthLayout } from "@features/auth";
import { SignInPage, SignUpPage } from "@pages/auth";
import IndexPage from "@pages/index-page";
import { PATH } from "@shared/constants/path";
import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<IndexPage />} />
      <Route element={<AuthLayout />}>
        <Route path={PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
