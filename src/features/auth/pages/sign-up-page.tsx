import { useState } from "react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import { Button, Input } from "@shared/ui/shadcn";
import { useSignUpMutation } from "@features/auth/hooks/mutations/use-sign-up-mutation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitSignUpForm } = useSignUpMutation();

  const handleSignupClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    submitSignUpForm({ email, password });
  };

  return (
    <div className="auth-container">
      <h2 className="text-center font-semibold">SIGN UP</h2>
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
        <Button className="w-full" onClick={handleSignupClick}>
          Create Account
        </Button>
        <Link to={PATH.AUTH.SIGN_IN}>
          <p className="text-muted-foreground hover:bg-accent rounded-sm text-center text-xs hover:underline">
            이미 계정이 있다면? 로그인 하러가기
          </p>
        </Link>
      </div>
    </div>
  );
}
