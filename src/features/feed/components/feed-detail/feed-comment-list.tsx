import { FeedCommentItem } from "@features/feed/components/feed-detail/feed-comment-item";

export function FeedCommentList() {
  return (
    <div className="flex flex-col gap-1.5">
      <FeedCommentItem />
      <FeedCommentItem />
      <FeedCommentItem />
    </div>
  );
}
