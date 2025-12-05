import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { insertFeed } from "@features/feed/api/insert-create-feed";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useFeedCreateMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSessionState();

  return useMutation({
    mutationFn: insertFeed,
    onSuccess: (insertFeed) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.removeQueries({
        queryKey: FEED_QUERY_KEYS.feed.details(session?.user.id ?? null),
      });
      queryClient.resetQueries({
        queryKey: FEED_QUERY_KEYS.feed.listGroup(session?.user.id ?? null),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
