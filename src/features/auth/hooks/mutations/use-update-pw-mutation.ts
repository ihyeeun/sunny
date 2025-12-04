import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updatePassword } from "@features/auth/api/update-password";

export function useUpdatePwMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
