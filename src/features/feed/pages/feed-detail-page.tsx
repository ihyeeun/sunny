import { Navigate, useParams } from "react-router";

import { PATH } from "@shared/constants/path";
import { FeedItem } from "@features/feed/components/feed-item";
import { FEED_ITEM_TYPE } from "@features/feed/constants/constant";

export default function FeedDetailPage() {
  const params = useParams();
  const feedId = params.feedId;

  if (!feedId) return <Navigate to={PATH.ROOT} />;
  return (
    <>
      <FeedItem feedId={Number(feedId)} feedItemType={FEED_ITEM_TYPE.DETAIL} />
    </>
  );
}
