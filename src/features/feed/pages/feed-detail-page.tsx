import { Navigate, useParams } from "react-router";

import { PATH } from "@shared/constants/path";
import { FeedComment } from "@features/feed/components/feed-detail/feed-comment";
import { FeedCommentEditor } from "@features/feed/components/feed-detail/feed-comment-editor";
import { FeedItem } from "@features/feed/components/feed-item";
import { FEED_ITEM_TYPE } from "@features/feed/constants/constant";

export default function FeedDetailPage() {
  const params = useParams();
  const feedId = params.feedId;

  if (!feedId) return <Navigate to={PATH.ROOT} />;
  return (
    <div className="flex flex-col gap-2">
      <FeedItem feedId={Number(feedId)} feedItemType={FEED_ITEM_TYPE.DETAIL} />
      <FeedComment feedId={Number(feedId)} />
      <div className="bg-background sticky bottom-0">
        <FeedCommentEditor mode="CREATE" feedId={Number(feedId)} />
      </div>
    </div>
  );
}
