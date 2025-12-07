import { FeedCommentEditor } from "@features/feed/components/feed-detail/feed-comment-editor";
import { FeedCommentList } from "@features/feed/components/feed-detail/feed-comment-list";

export function FeedComment({ feedId }: { feedId: number }) {
  return (
    <div className="border px-3 py-2">
      <p>댓글</p>
      <div className="my-2 h-0.5 w-full bg-gray-100" />
      <FeedCommentList />
      <FeedCommentEditor feedId={Number(feedId)} />
    </div>
  );
}
