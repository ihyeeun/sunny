import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { postCreateFeed } from "@features/feed/api/post-create-feed";

export function useFeedCreateMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: postCreateFeed,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
