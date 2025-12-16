import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import { getFeedList } from "@features/feed/api/get-feed-list";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

const PAGE_SIZE = 5;

export function useInfinteFeedListQuery(authorId?: string) {
  const queryClient = useQueryClient();
  const session = useSessionState();

  const viewerId = session?.user.id ?? null;

  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.feed.list({
      viewerId,
      authorId: authorId ?? null,
    }),
    queryFn: async ({ pageParam }) => {
      const feeds = await getFeedList({
        cursor: pageParam,
        limit: PAGE_SIZE,
        userId: session?.user.id,
        authorId,
      });
      feeds.forEach((feed) => {
        queryClient.setQueryData(FEED_QUERY_KEYS.feed.byId(feed.id, viewerId), feed);
      });

      return feeds.map((feed) => feed.id);
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < PAGE_SIZE) return undefined;

      return lastPage[lastPage.length - 1];
    },
    staleTime: Infinity,
  });
}
