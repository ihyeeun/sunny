import { type ReactNode, useEffect } from "react";

import supabase from "@shared/lib/supabase";
import {
  useSessionLoadedState,
  useSessionState,
  useSetSession,
} from "@shared/store/session";
import { GlobalLoaded } from "@shared/ui/common";
import { useProfileDataQuery } from "@features/user/hooks/queries/use-profile-data-query";

export default function AuthWatcher({ children }: { children: ReactNode }) {
  const sessionState = useSessionState();
  const setSession = useSetSession();
  const hasSessionLoaded = useSessionLoadedState();

  const { data: profile, isLoading: isProfileLoading } = useProfileDataQuery(
    sessionState?.user.id,
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  });

  if (!hasSessionLoaded) return <GlobalLoaded />;
  if (isProfileLoading) return <GlobalLoaded />;

  return children;
}
