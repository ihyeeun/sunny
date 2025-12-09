import { FeedCommentList } from "@features/feed/components/feed-detail/feed-comment-list";

export function FeedComment({ feedId }: { feedId: number }) {
  return (
    <div className="px-2">
      <h3 className="visuallyhidden">Comments</h3>
      <p>댓글</p>
      <div className="my-2 h-0.5 w-full bg-gray-100" />
      <FeedCommentList feedId={Number(feedId)} />
    </div>
  );
}
