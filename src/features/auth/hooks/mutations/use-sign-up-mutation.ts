import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { signUp } from "@features/auth/api/sign-up";

export function useSignUpMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
