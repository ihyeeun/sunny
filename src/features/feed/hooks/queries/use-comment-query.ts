import { useQuery } from "@tanstack/react-query";

import { getComments } from "@features/feed/api/comment/get-comments";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useCommentsQuery(feedId: number) {
  return useQuery({
    queryKey: FEED_QUERY_KEYS.comment.comment_list(feedId),
    queryFn: () => getComments(feedId),
  });
}
