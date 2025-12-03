import { useInfiniteQuery } from "@tanstack/react-query";

import { getFeedList } from "@features/feed/api/get-feed-list";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

const PAGE_SIZE = 5;

export function useInfinteFeedListQuery() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.feed.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const feeds = await getFeedList({ from, to });

      return feeds;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
}
