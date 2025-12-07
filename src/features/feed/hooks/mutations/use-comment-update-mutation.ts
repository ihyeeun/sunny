import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { updateComment } from "@features/feed/api/comment/update-comment";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";
import type { Comment } from "@features/feed/types/feed";

export function useCommentUpdateMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updateComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(
        FEED_QUERY_KEYS.comment.comment_list(updateComment.feed_id),
        (prevCommnetList) => {
          if (!prevCommnetList)
            throw new Error("댓글이 캐시데이터에 보관되어있지 않습니다.");

          return prevCommnetList.map((comment) => {
            if (comment.id === updateComment.id)
              return { ...comment, ...updateComment };
            return comment;
          });
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
