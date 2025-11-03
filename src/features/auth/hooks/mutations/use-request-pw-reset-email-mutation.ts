import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { postRequestPasswordResetEmail } from "@features/auth/api/post-request-pw-reset-email";

export function useRequestPwResetEmailMutation(
  callbacks?: UseMutationCallback,
) {
  return useMutation({
    mutationFn: postRequestPasswordResetEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
