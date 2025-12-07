import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { deleteComment } from "@features/feed/api/comment/delete-comment";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";
import type { Comment } from "@features/feed/types/feed";

export function useCommentDeleteMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deleteComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.setQueryData<Comment[]>(
        FEED_QUERY_KEYS.comment.comment_list(deleteComment.feed_id),
        (prevCommentList) => {
          if (!prevCommentList)
            throw new Error("댓글이 캐시 데이터에 보관되어있지 않습니다.");
          return prevCommentList.filter(
            (comment) => comment.id !== deleteComment.id,
          );
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
