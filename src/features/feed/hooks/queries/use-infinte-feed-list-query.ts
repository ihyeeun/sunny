import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import { getFeedList } from "@features/feed/api/get-feed-list";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

const PAGE_SIZE = 5;

export function useInfinteFeedListQuery() {
  const queryClient = useQueryClient();
  const session = useSessionState();

  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.feed.list(session?.user.id ?? null),
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const feeds = await getFeedList({ from, to, userId: session?.user.id });
      feeds.forEach((feed) => {
        queryClient.setQueryData(
          FEED_QUERY_KEYS.feed.byId(feed.id, session?.user.id ?? null),
          feed,
        );
      });

      return feeds.map((feed) => feed.id);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: Infinity,
  });
}
