import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { FeedCommentItem } from "@features/feed/components/feed-detail/feed-comment-item";
import { useCommentsQuery } from "@features/feed/hooks/queries/use-comment-query";

export function FeedCommentList({ feedId }: { feedId: number }) {
  const {
    data: comment_list,
    error: fetchCommentsError,
    isPending: isFetchCommentPending,
  } = useCommentsQuery(feedId);

  if (isFetchCommentPending) return <GlobalLoaded />;
  if (fetchCommentsError) return <Fallback />;

  return (
    <div className="flex flex-col gap-1.5">
      {comment_list.map((comment) => (
        <FeedCommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
