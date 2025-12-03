import { useQuery } from "@tanstack/react-query";

import { getFeedById } from "@features/feed/api/get-feed-by-id";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useFeedByIdQuery({
  feedId,
  feedType,
}: {
  feedId: number;
  feedType: "FEED" | "DETAIL";
}) {
  return useQuery({
    queryKey: FEED_QUERY_KEYS.feed.byId(feedId),
    queryFn: () => {
      return getFeedById(feedId);
    },
    enabled: feedType === "FEED" ? false : true,
  });
}
