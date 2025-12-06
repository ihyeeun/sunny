import { PopoverClose } from "@radix-ui/react-popover";
import { Ellipsis } from "lucide-react";

import { Button, Popover } from "@shared/ui/shadcn";
import { PopoverContent, PopoverTrigger } from "@shared/ui/shadcn/popover";

import defaultAvatar from "@/assets/default-avatar.png";

export function FeedCommentItem() {
  return (
    <div className="flex flex-row gap-2">
      <figure>
        <img src={defaultAvatar} className="size-8 rounded-full border" />
      </figure>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold">USERNAME</p>
            <time className="text-caption text-muted-foreground block leading-none">
              TIME
            </time>
          </div>

          <Popover>
            <PopoverTrigger>
              <Button
                size="icon-sm"
                variant="ghost"
                className="cursor-pointer rounded-full p-0"
              >
                <Ellipsis
                  strokeWidth={0.5}
                  size={20}
                  className="text-muted-foreground"
                  fill="currentColor"
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="text-muted-foreground flex w-fit cursor-pointer flex-col p-0 text-center text-sm">
              <PopoverClose asChild className="hover:bg-muted px-4 py-2">
                <p>수정</p>
              </PopoverClose>
              <PopoverClose asChild className="hover:bg-muted px-4 py-2">
                <p className="flex items-center gap-2">삭제</p>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        </div>

        <div>content</div>
        <div>
          <p className="text-muted-foreground text-caption cursor-pointer hover:underline">
            댓글 남기기
          </p>
        </div>
      </div>
    </div>
  );
}
