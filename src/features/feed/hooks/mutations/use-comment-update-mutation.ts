import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updateComment } from "@features/feed/api/comment/update-comment";

export function useCommentUpdateMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
