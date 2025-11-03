import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { putUpdatePassword } from "@features/auth/api/put-update-password";

export function useUpdatePwMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: putUpdatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
