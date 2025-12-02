import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { signIn } from "@features/auth/api/sign-in";

export function useSignInMutatioin(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
