import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { signIn } from "@features/auth/api/sign-in";
import { FEED_QUERY_KEYS } from "@features/feed/constants/query-key";

export function useSignInMutatioin(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.removeQueries({
        queryKey: FEED_QUERY_KEYS.feed.viewer(null),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
