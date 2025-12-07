import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { FeedCommentItem } from "@features/feed/components/feed-detail/feed-comment-item";
import { useCommentsQuery } from "@features/feed/hooks/queries/use-comment-query";
import type { Comment, NestedComment } from "@features/feed/types/feed";

function toNestedCommentList(commentList: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  commentList.forEach((comment) => {
    if (!comment.parent_comment_id) {
      result.push({ ...comment, childrenComment: [] });
    } else {
      const parentCommentIndex = result.findIndex(
        (item) => item.id === comment.parent_comment_id,
      );

      result[parentCommentIndex].childrenComment.push({
        ...comment,
        childrenComment: [],
        parentComment: result[parentCommentIndex],
      });
    }
  });

  return result;
}

export function FeedCommentList({ feedId }: { feedId: number }) {
  const {
    data: comment_list,
    error: fetchCommentsError,
    isPending: isFetchCommentPending,
  } = useCommentsQuery(feedId);

  if (isFetchCommentPending) return <GlobalLoaded />;
  if (fetchCommentsError) return <Fallback />;

  const nestedCommentList = toNestedCommentList(comment_list);

  return (
    <div className="flex flex-col gap-1.5">
      {nestedCommentList.map((comment) => (
        <FeedCommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
