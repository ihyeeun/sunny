import { useEffect, useRef, useState } from "react";
import { CircleArrowUp } from "lucide-react";

import { Button, Textarea } from "@shared/ui/shadcn";

export function FeedCommentEditor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);
  return (
    <div className="flex flex-row items-end gap-1">
      <Textarea
        className="scrollbar-none max-h-30 min-h-8.5 resize-none py-1.5 text-sm"
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글 남기기"
      />
      <Button variant="ghost" className="cursor-pointer" size="icon">
        <CircleArrowUp
          strokeWidth={1}
          className="text-muted-foreground size-6.5"
        />
      </Button>
    </div>
  );
}
