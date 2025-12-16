import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { FeedItem } from "@features/feed/components/feed-item";
import { FEED_ITEM_TYPE } from "@features/feed/constants/constant";
import { useInfinteFeedListQuery } from "@features/feed/hooks/queries/use-infinte-feed-list-query";

export default function FeedListPage({ authorId }: { authorId?: string }) {
  const {
    data: feedsId,
    error,
    isPending,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinteFeedListQuery(authorId);
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <GlobalLoaded />;

  return (
    <>
      <ul className="flex flex-col gap-4">
        {feedsId.pages.map((page) =>
          page.map((feedId) => (
            <li key={feedId}>
              <FeedItem feedId={feedId} feedItemType={FEED_ITEM_TYPE.LIST} />
              <div className="mt-4 h-0.5 w-full bg-gray-100" />
            </li>
          )),
        )}
      </ul>
      <div ref={loadMoreRef} />
      {isFetchingNextPage && <GlobalLoaded />}
    </>
  );
}
