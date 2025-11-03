import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { postSignInWithOAuth } from "@features/auth/api/post-sign-in-with-oauth";

export function useSignInWithOAuthMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: postSignInWithOAuth,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
