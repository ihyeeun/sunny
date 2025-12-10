import { type ReactNode, useEffect } from "react";

import supabase from "@shared/lib/supabase";
import { useSessionLoadedState, useSetSession } from "@shared/store/session";
import { GlobalLoaded } from "@shared/ui/common";

export default function AuthWatcher({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const hasSessionLoaded = useSessionLoadedState();

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      subscription.subscription?.unsubscribe();
    };
  }, []);

  if (!hasSessionLoaded) return <GlobalLoaded />;

  return children;
}
