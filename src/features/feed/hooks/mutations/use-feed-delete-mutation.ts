import { useMutation } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { deleteFeed, deleteImagesInPath } from "@features/feed/api/delete-feed";

export function useFeedDeleteMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: async (deleteFeed) => {
      if (callbacks?.onSuccess) return callbacks.onSuccess();
      if (deleteFeed.image_urls && deleteFeed.image_urls.length > 0) {
        await deleteImagesInPath(`${deleteFeed.author_id}/${deleteFeed.id}`);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) return callbacks.onError(error);
    },
  });
}
