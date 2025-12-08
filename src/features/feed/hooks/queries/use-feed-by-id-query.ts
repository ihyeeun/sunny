import { useQuery } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import { getFeedById } from "@features/feed/api/get-feed-by-id";
import { FEED_ITEM_TYPE } from "@features/feed/constants/constant";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";
import { type FeedItemType } from "@features/feed/types/feed";

export function useFeedByIdQuery({
  feedId,
  feedItemType,
}: {
  feedId: number;
  feedItemType: FeedItemType;
}) {
  const session = useSessionState();

  return useQuery({
    queryKey: FEED_QUERY_KEYS.feed.byId(feedId, session?.user?.id ?? null),
    queryFn: () => {
      return getFeedById({ feedId, userId: session?.user.id });
    },
    enabled: feedItemType === FEED_ITEM_TYPE.LIST ? false : true,
  });
}
