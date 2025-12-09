import { PopoverClose } from "@radix-ui/react-popover";
import { CheckIcon, SunMoon } from "lucide-react";

import { useCurrentTheme, useSetTheme } from "@shared/store/theme";
import type { Theme } from "@shared/types/theme.types";
import { Popover } from "@shared/ui/shadcn";
import { PopoverContent, PopoverTrigger } from "@shared/ui/shadcn/popover";

const THEMES: Theme[] = ["dark", "light", "system"];
const THEME_LABEL = {
  dark: "Dark",
  light: "Light",
  system: "System Mode",
} as const;

export default function ThemeButton() {
  const currentTheme = useCurrentTheme();
  const setTheme = useSetTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="hover:bg-muted cursor-pointer rounded-full p-2"
          aria-label="테마 변경"
        >
          <SunMoon className="size-4" strokeWidth={1} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        role="menu"
        className="text-muted-foreground w-fit cursor-pointer p-0 text-center text-sm"
      >
        {THEMES.map((theme) => (
          <PopoverClose asChild key={theme}>
            <button
              role="menuitem"
              onClick={() => setTheme(theme)}
              aria-pressed={currentTheme === theme}
              className="hover:bg-muted flex w-full cursor-pointer items-center px-4 py-2 text-left"
            >
              {THEME_LABEL[theme]}
              {currentTheme === theme && (
                <CheckIcon
                  strokeWidth={1}
                  size={15}
                  className="ml-1"
                  aria-hidden="true"
                />
              )}
            </button>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}
