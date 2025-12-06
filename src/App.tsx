import { Navigate, Route, Routes } from "react-router";

import { PATH } from "@shared/constants/path";
import { GlobalLayout, GuestGuard, MemberGuard } from "@shared/ui/common";
import {
  AuthLayout,
  ForgetPasswordPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
} from "@features/auth";
import { FeedDetailPage } from "@features/feed";
import { IndexPage } from "@features/home";
import { ProfileDetailPage } from "@features/user";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path={PATH.ROOT} element={<IndexPage />} />

        <Route element={<GuestGuard />}>
          <Route element={<AuthLayout />}>
            <Route path={PATH.AUTH.SIGN_IN} element={<SignInPage />} />
            <Route path={PATH.AUTH.SIGN_UP} element={<SignUpPage />} />
          </Route>
          <Route
            path={PATH.AUTH.FORGET_PASSWORD}
            element={<ForgetPasswordPage />}
          />
        </Route>

        <Route element={<MemberGuard />}>
          <Route path={PATH.FEED.DETAIL_ROUTE} element={<FeedDetailPage />} />
          <Route
            path={PATH.PROFILE.DETAIL_ROUTE}
            element={<ProfileDetailPage />}
          />
          <Route
            path={PATH.AUTH.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />
        </Route>

        {/* 위에 설정한 경로가 아닌 예외 경로로 요청이 오면 root 페이지로 이동 */}
        <Route path="*" element={<Navigate to={PATH.ROOT} />} />
      </Route>
    </Routes>
  );
}

export default App;
