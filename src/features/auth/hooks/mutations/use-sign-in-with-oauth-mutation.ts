import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { signInWithOAuth } from "@features/auth/api/sign-in-with-oauth";

export function useSignInWithOAuthMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
