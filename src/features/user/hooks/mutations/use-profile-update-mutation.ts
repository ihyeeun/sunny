import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UseMutationCallback } from "@shared/types/callbacks.types";
import { type ProfileEntity } from "@shared/types/database.types";
import { updateProfile } from "@features/user/api/update-profile";
import { PROFILE_QUERY_KEYS } from "@features/user/constants/query-key";

export function useProfileUpdateMutation(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updateProfile) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.setQueryData<ProfileEntity>(
        PROFILE_QUERY_KEYS.profile.byId(updateProfile.id),
        updateProfile,
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
