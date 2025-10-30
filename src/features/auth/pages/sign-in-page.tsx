import { useState } from "react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import { Button, Input } from "@shared/ui/shadcn";
import { useSignInMutatioin } from "@features/auth/hooks/mutations/use-sign-in-mutation";
import { useSignInWithOAuthMutation } from "@features/auth/hooks/mutations/use-sign-in-with-oauth-mutation";

import githubLogo from "@/assets/github-mark.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitSignInWithPW } = useSignInMutatioin();
  const { mutate: submitSignInWithOAuth } = useSignInWithOAuthMutation();

  const handleSignInClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    submitSignInWithPW({ email, password });
  };

  const handleSignInGithubClick = () => {
    submitSignInWithOAuth("github");
  };

  return (
    <div className="auth-container">
      <h2 className="text-center font-semibold">SIGN IN</h2>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="example@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSignInClick}>
          Login
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInGithubClick}
        >
          <img src={githubLogo} className="h-5 w-5" />
          Github 계정으로 로그인
        </Button>
        <Link to={PATH.AUTH.SIGN_UP}>
          <p className="text-muted-foreground hover:bg-accent rounded-sm text-center text-xs hover:underline">
            계정이 없다면? 회원가입 하러 가기
          </p>
        </Link>
      </div>
    </div>
  );
}
