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
        setSession: (newSession: Session | null) =>
          set(
            (prev) => {
              // session 둘 다 null일 때는 비교하지 말고 업데이트 허용
              if (
                prev.session !== null &&
                newSession !== null &&
                JSON.stringify(prev.session) === JSON.stringify(newSession)
              ) {
                return prev; // 동일한 session → 업데이트 하지 않음
              }

              return { session: newSession, hasSessionLoaded: true };
            },
            false,
            "setSession",
          ),
      },
    })),
    { name: "SessionStore" },
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
