import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

interface AuthState {
  hasSessionLoaded: boolean;
  session: Session | null;
}

const initialState = {
  hasSessionLoaded: false,
  session: null,
} as AuthState;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, hasSessionLoaded: true });
        },
      },
    })),
    {
      name: "SessionStore",
    },
  ),
);

export const useSessionState = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};

export const useSessionLoadedState = () => {
  const hasSessionLoaded = useSessionStore((store) => store.hasSessionLoaded);
  return hasSessionLoaded;
};

export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);
  return setSession;
};
