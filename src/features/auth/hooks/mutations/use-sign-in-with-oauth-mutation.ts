import { useMutation } from "@tanstack/react-query";

import { postSignInWithOAuth } from "@features/auth/api/post-sign-in-with-oauth";

export function useSignInWithOAuthMutation() {
  return useMutation({
    mutationFn: postSignInWithOAuth,
  });
}
