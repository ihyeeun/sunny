import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { postSignUp } from "@features/auth/api/post-sign-up";

export function useSignUpMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
