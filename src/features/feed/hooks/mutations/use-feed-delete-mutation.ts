import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { deleteFeed, deleteImagesInPath } from "@features/feed/api/delete-feed";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useFeedDeleteMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSessionState();

  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: async (deleteFeed) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      if (deleteFeed.image_urls && deleteFeed.image_urls.length > 0) {
        await deleteImagesInPath(`${deleteFeed.author_id}/${deleteFeed.id}`);
      }
      queryClient.removeQueries({
        queryKey: FEED_QUERY_KEYS.feed.details(session?.user.id ?? null),
      });
      queryClient.resetQueries({
        queryKey: FEED_QUERY_KEYS.feed.listGroup(session?.user.id ?? null),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) return callbacks.onError(error);
    },
  });
}
