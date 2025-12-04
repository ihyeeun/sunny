import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updateFeedLikeToggle } from "@features/feed/api/update-feed-like-toggle";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";
import { type FeedItem } from "@features/feed/types/feed";

export default function useFeedLikeToggleMutation(
  callbacks?: UseMutationCallback,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeedLikeToggle,
    onMutate: async ({ feedId, userId }) => {
      await queryClient.cancelQueries({
        queryKey: FEED_QUERY_KEYS.feed.byId(feedId, userId),
      });

      const backupFeed = queryClient.getQueryData<FeedItem>(
        FEED_QUERY_KEYS.feed.byId(feedId, userId),
      );

      queryClient.setQueryData<FeedItem>(
        FEED_QUERY_KEYS.feed.byId(feedId, userId),
        (feed) => {
          if (!feed) throw new Error("포스트가 존재하지 않습니다.");
          return {
            ...feed,
            isFeedLiked: !feed.isFeedLiked,
            like_cnt: feed.isFeedLiked ? feed.like_cnt - 1 : feed.like_cnt + 1,
          };
        },
      );

      return { backupFeed };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) return callbacks.onSuccess();
    },
    onError: (error, { feedId, userId }, context) => {
      if (context?.backupFeed) {
        queryClient.setQueryData(
          FEED_QUERY_KEYS.feed.byId(feedId, userId),
          context.backupFeed,
        );
      }
      if (callbacks?.onError) return callbacks.onError(error);
    },
  });
}
