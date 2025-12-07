import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { FeedCommentItem } from "@features/feed/components/feed-detail/feed-comment-item";
import { useCommentsQuery } from "@features/feed/hooks/queries/use-comment-query";
import type { Comment, NestedComment } from "@features/feed/types/feed";

function toNestedCommentList(commentList: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  commentList.forEach((comment) => {
    if (!comment.root_comment_id) {
      result.push({ ...comment, childrenComment: [] });
    } else {
      const rootCommentIndex = result.findIndex(
        (item) => item.id === comment.root_comment_id,
      );

      const parentComment = commentList.find(
        (item) => item.id === comment.parent_comment_id,
      );

      if (rootCommentIndex === -1) return;
      if (!parentComment) return;

      result[rootCommentIndex].childrenComment.push({
        ...comment,
        childrenComment: [],
        parentComment,
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
    <div className="flex flex-col gap-2">
      {nestedCommentList.map((comment) => (
        <FeedCommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
