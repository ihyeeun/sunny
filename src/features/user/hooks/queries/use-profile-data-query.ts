import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import { useSessionState } from "@shared/store/session";
import { getProfile } from "@features/user/api/get-profile";
import { insertCreateProfile } from "@features/user/api/insert-create-profile";
import { PROFILE_QUERY_KEYS } from "@features/user/constants/query-key";

export function useProfileDataQuery(userId?: string) {
  const session = useSessionState();
  const isMine = userId === session?.user.id;
  return useQuery({
    queryFn: async () => {
      try {
        const profile = await getProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          // 남의 프로필이 없을 때 생성하지 않기 하기 위함으로 내 프로필일때 조건을 넣은 것.
          return await insertCreateProfile(userId!);
        }
        throw error;
      }
    },
    queryKey: PROFILE_QUERY_KEYS.profile.byId(userId!),
    enabled: !!userId,
  });
}
