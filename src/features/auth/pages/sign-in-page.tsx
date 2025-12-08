import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { PATH } from "@shared/constants/path";
import { useTheme } from "@shared/store/theme";
import { Button, Input } from "@shared/ui/shadcn";
import { generateErrorMessage } from "@features/auth/constants/auth-error-message-kr";
import { useSignInMutatioin } from "@features/auth/hooks/mutations/use-sign-in-mutation";
import { useSignInWithOAuthMutation } from "@features/auth/hooks/mutations/use-sign-in-with-oauth-mutation";

import darkGithubLogo from "@/assets/github-mark.svg";
import whiteGithubLogo from "@/assets/github-mark-white.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  const { mutate: submitSignInWithPW, isPending: isSignInWithPWPending } =
    useSignInMutatioin({
      onSuccess: () => {
        toast.success("로그인에 성공했습니다. 잠시만 기다려주세요.", {
          position: "top-center",
        });
      },
      onError: (error) => {
        const errorMsg = generateErrorMessage(error);

        toast.error(errorMsg, { position: "top-center" });
        setPassword("");
      },
    });
  const { mutate: submitSignInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuthMutation({
      onSuccess: () => {
        toast.success("로그인에 성공했습니다. 잠시만 기다려주세요.", {
          position: "top-center",
        });
      },
      onError: (error) => {
        const errorMsg = generateErrorMessage(error);
        toast(errorMsg, { position: "top-center" });
      },
    });

  const handleSignInClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    submitSignInWithPW({ email, password });
  };

  const handleSignInGithubClick = () => {
    submitSignInWithOAuth("github");
  };

  const isSignInPending = isSignInWithPWPending || isSignInWithOAuthPending;
  return (
    <div className="auth-container">
      <h2 className="text-center font-semibold">SIGN IN</h2>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="example@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSignInPending}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSignInPending}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className="w-full cursor-pointer"
          onClick={handleSignInClick}
          disabled={isSignInPending}
        >
          로그인
        </Button>
        <div className="flex flex-row justify-evenly">
          <Link to={PATH.AUTH.SIGN_UP}>
            <p className="text-muted-foreground rounded-sm text-center text-xs hover:underline">
              계정이 없다면? 회원가입 하러 가기
            </p>
          </Link>
          <Link to={PATH.AUTH.FORGET_PASSWORD}>
            <p className="text-muted-foreground rounded-sm text-center text-xs hover:underline">
              비밀번호를 잊으셨나요?
            </p>
          </Link>
        </div>

        <div className="my-3 h-0.5 w-full bg-gray-100" />

        <p className="text-center">간편 로그인</p>
        <Button
          className="w-full cursor-pointer"
          onClick={handleSignInGithubClick}
          disabled={isSignInPending}
        >
          <img
            src={theme === "dark" ? darkGithubLogo : whiteGithubLogo}
            className="h-5 w-5"
          />
          Github 계정으로 로그인
        </Button>
      </div>
    </div>
  );
}
