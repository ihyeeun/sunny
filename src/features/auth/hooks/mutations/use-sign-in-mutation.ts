import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { postSignIn } from "@features/auth/api/post-sign-in";

export function useSignInMutatioin(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: postSignIn,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
