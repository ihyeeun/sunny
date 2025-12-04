import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updateFeed } from "@features/feed/api/update-feed";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";
import { type FeedItem } from "@features/feed/types/feed";

export function useFeedUpdateMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeed,
    onSuccess: (updateFeed) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<FeedItem>(
        FEED_QUERY_KEYS.feed.byId(updateFeed.id),
        (prevFeed) => {
          if (!prevFeed)
            throw new Error(
              `${updateFeed.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`,
            );
          return { ...prevFeed, ...updateFeed };
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
