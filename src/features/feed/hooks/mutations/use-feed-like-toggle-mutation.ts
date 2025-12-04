import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updateFeedLikeToggle } from "@features/feed/api/update-feed-like-toggle";

export default function useFeedLikeToggleMutation(
  callbacks?: UseMutationCallback,
) {
  return useMutation({
    mutationFn: updateFeedLikeToggle,
    onSuccess: () => {
      if (callbacks?.onSuccess) return callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) return callbacks.onError(error);
    },
  });
}
