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
      },
    });
  const handleSendEmail = () => {
    if (email.trim() === "") {
      return toast.warning("이메일을 입력해주세요", { position: "top-center" });
    }
    requestPwResetEmail(email);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendEmail();
      }}
      className="auth-container"
    >
      <div>
        <h2 className="text-xl font-bold">비밀번호를 잊으셨나요?</h2>
        <p className="text-muted-foreground text-sm">
          이메일로 비밀번호를 재설정할 수 있는 인증 링크를 보내드립니다.
        </p>
      </div>

      <label htmlFor="email" className="visuallyhidden">
        이메일 주소
      </label>

      <Input
        id="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@abc.com"
        disabled={isPending}
      />

      <Button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="cursor-pointer"
      >
        {isPending ? "전송 중..." : "인증 메일로 요청하기"}
      </Button>
    </form>
  );
}
