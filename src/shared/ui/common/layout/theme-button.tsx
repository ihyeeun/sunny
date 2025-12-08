import { PopoverClose } from "@radix-ui/react-popover";
import { CheckIcon, SunMoon } from "lucide-react";

import { useSetTheme, useTheme } from "@shared/store/theme";
import type { Theme } from "@shared/types/theme.types";
import { Popover } from "@shared/ui/shadcn";
import { PopoverContent, PopoverTrigger } from "@shared/ui/shadcn/popover";

const THEMES: Theme[] = ["dark", "light", "system"];

export default function ThemeButton() {
  const currentTheme = useTheme();
  const setTheme = useSetTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hover:bg-muted cursor-pointer rounded-full p-2">
          <SunMoon className="size-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="text-muted-foreground w-fit cursor-pointer p-0 text-center text-sm">
        {THEMES.map((theme) => (
          <PopoverClose
            asChild
            key={`theme-button-${theme}`}
            className="hover:bg-muted px-4 py-2"
            onClick={() => setTheme(theme)}
          >
            <p className="flex items-center">
              {theme}
              <span>
                {currentTheme === theme && (
                  <CheckIcon strokeWidth={1} size={15} className="ml-1" />
                )}
              </span>
            </p>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}
