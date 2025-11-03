import { useState } from "react";
import { toast } from "sonner";

import { Button, Input } from "@shared/ui/shadcn";
import { generateErrorMessage } from "@features/auth/constants/auth-error-message-kr";
import { useRequestPwResetEmailMutation } from "@features/auth/hooks/mutations/use-request-pw-reset-email-mutation";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate: requestPwResetEmail, isPending } =
    useRequestPwResetEmailMutation({
      onSuccess: () => {
        toast.success(
          "인증 메일이 정상적으로 전송되었습니다. 메일함가서 확인해주세요.",
          { position: "top-center" },
        );
        setEmail("");
      },
      onError: (error) => {
        const errorMsg = generateErrorMessage(error);
        toast.error(errorMsg, { position: "top-center" });
        setEmail("");
      },
    });
  const handleSendEmail = () => {
    if (email.trim() === "") return;
    requestPwResetEmail(email);
  };

  return (
    <div className="auth-container">
      <div>
        <h2 className="text-xl font-bold">비밀번호를 잊으셨나요?</h2>
        <p className="text-muted-foreground text-sm">
          이메일로 비밀번호를 재설정할 수 있는 인증 링크를 보내드립니다.
        </p>
      </div>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@abc.com"
        disabled={isPending}
      />
      <Button onClick={handleSendEmail} disabled={isPending}>
        위 인증 메일로 요청하기
      </Button>
    </div>
  );
}
