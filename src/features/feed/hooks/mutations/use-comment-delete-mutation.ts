import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { deleteComment } from "@features/feed/api/comment/delete-comment";

export function useCommentDeleteMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
