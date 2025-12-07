import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { insertFeedComment } from "@features/feed/api/comment/insert-feed-comment";

export function useCommentCreateMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: insertFeedComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
