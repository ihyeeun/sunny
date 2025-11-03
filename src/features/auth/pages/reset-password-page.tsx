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
      navigate(PATH.ROOT);
    },
    onError: (error) => {
      const errorMsg = generateErrorMessage(error);
      toast.error(errorMsg, { position: "top-center" });
      setPassword("");
    },
  });

  const handleSubmitPassword = () => {
    if (password.trim() === "") return;

    updatePw(password);
  };

  return (
    <div className="auth-container">
      <div>
        <h2 className="text-xl font-bold">비밀번호 재설정하기</h2>
        <p className="text-muted-foreground text-sm">
          새로운 비밀번호를 입력해주세요.
        </p>
      </div>
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        disabled={isPending}
      />
      <Button onClick={handleSubmitPassword} disabled={isPending}>
        위 비밀번호로 변경하기
      </Button>
    </div>
  );
}
