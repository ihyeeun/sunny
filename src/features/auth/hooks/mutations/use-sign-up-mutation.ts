import { useMutation } from "@tanstack/react-query";

import { postSignUp } from "@features/auth/api/post-sign-up";

export function useSignUpMutation() {
  return useMutation({
    mutationFn: postSignUp,
  });
}
