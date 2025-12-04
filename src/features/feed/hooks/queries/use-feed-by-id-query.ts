import { useQuery } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import { getFeedById } from "@features/feed/api/get-feed-by-id";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useFeedByIdQuery({
  feedId,
  feedType,
}: {
  feedId: number;
  feedType: "FEED" | "DETAIL";
}) {
  const session = useSessionState();

  return useQuery({
    queryKey: FEED_QUERY_KEYS.feed.byId(feedId, session?.user?.id ?? null),
    queryFn: () => {
      return getFeedById({ feedId, userId: session?.user.id });
    },
    enabled: feedType === "FEED" ? false : true,
  });
}
