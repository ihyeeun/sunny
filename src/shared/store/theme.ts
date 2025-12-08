import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

import type { Theme } from "@shared/types/theme.types";

interface State {
  theme: Theme;
}

const initialState: State = {
  theme: "system",
};

const useThemeStore = create(
  persist(
    combine(initialState, (set) => ({
      actions: {
        setTheme: (theme: Theme) => {
          const htmlTag = document.documentElement;
          htmlTag.classList.remove("dark", "light");

          if (theme === "system") {
            const isDarkTheme = window.matchMedia(
              "(prefers-color-scheme: dark)",
            ).matches;

            htmlTag.classList.add(isDarkTheme ? "dark" : "light");
          } else {
            htmlTag.classList.add(theme);
          }

          set({ theme });
        },
      },
    })),
    {
      name: "ThemeStore",
      partialize: (store) => ({ theme: store.theme }),
    },
  ),
);

export const useTheme = () => {
  const theme = useThemeStore((store) => store.theme);

  if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDark ? "dark" : "light";
  }

  return theme;
};

export const useCurrentTheme = () => {
  return useThemeStore((store) => store.theme);
};

export const useSetTheme = () => {
  const setTheme = useThemeStore((store) => store.actions.setTheme);
  return setTheme;
};
