import { useQuery } from "@tanstack/react-query";

import { getFeedList } from "@features/feed/api/get-feed-list";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useFeedListQuery() {
  return useQuery({
    queryKey: FEED_QUERY_KEYS.feed.list,
    queryFn: () => getFeedList(),
  });
}
