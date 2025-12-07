import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { insertFeedComment } from "@features/feed/api/comment/insert-feed-comment";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";
import type { Comment } from "@features/feed/types/feed";
import { useProfileDataQuery } from "@features/user/hooks/queries/use-profile-data-query";

export function useCommentCreateMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSessionState();
  const { data: profile } = useProfileDataQuery(session?.user.id);

  return useMutation({
    mutationFn: insertFeedComment,
    onSuccess: (newComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.setQueryData<Comment[]>(
        FEED_QUERY_KEYS.comment.comment_list(newComment.feed_id),
        (prevCommentList) => {
          if (!prevCommentList)
            throw new Error("댓글이 캐시데이터에 저장되어있지 않습니다.");

          if (!profile)
            throw new Error("사용자 프로필 정보를 찾을 수 없습니다.");

          const author = {
            avatar_image: profile?.avatar_image,
            nickname: profile?.nickname,
          };

          return [...prevCommentList, { ...newComment, author }];
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
