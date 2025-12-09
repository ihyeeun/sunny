import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { PATH } from "@shared/constants/path";
import { Button, Input } from "@shared/ui/shadcn";
import { generateErrorMessage } from "@features/auth/constants/auth-error-message-kr";
import { useUpdatePwMutation } from "@features/auth/hooks/mutations/use-update-pw-mutation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: updatePw, isPending } = useUpdatePwMutation({
    onSuccess: () => {
      toast.success("비밀번호 변경에 성공했습니다.", {
        position: "top-center",
      });
      navigate(PATH.AUTH.SIGN_IN);
    },
    onError: (error) => {
      const errorMsg = generateErrorMessage(error);
      toast.error(errorMsg, { position: "top-center" });
      setPassword("");
    },
  });

  const handleSubmitPassword = () => {
    if (password.trim() === "")
      return toast.warning("비밀번호를 입력해주세요", {
        position: "top-center",
      });

    updatePw(password);
  };

  return (
    <form className="auth-container">
      <div>
        <h2 className="text-xl font-bold">비밀번호 재설정하기</h2>
        <p className="text-muted-foreground text-sm">
          새로운 비밀번호를 입력해주세요.
        </p>
      </div>

      <label htmlFor="password" className="visuallyhidden">
        새 비밀번호 입력
      </label>

      <Input
        id="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="새 비밀번호"
        disabled={isPending}
      />
      <Button
        type="submit"
        onClick={handleSubmitPassword}
        disabled={isPending}
        className="cursor-pointer"
      >
        {isPending ? "변경 중..." : "비밀번호 변경하기"}
      </Button>
    </form>
  );
}
