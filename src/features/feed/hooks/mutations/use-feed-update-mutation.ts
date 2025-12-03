import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updateFeed } from "@features/feed/api/insert-create-feed";

export function useFeedUpdateMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateFeed,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
