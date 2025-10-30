import { useMutation } from "@tanstack/react-query";

import { postSignIn } from "@features/auth/api/post-sign-in";

export function useSignInMutatioin() {
  return useMutation({
    mutationFn: postSignIn,
  });
}
