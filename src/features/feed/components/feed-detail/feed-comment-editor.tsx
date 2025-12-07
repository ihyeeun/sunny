import { useEffect, useRef, useState } from "react";
import { CircleArrowUp } from "lucide-react";
import { toast } from "sonner";

import { Button, Textarea } from "@shared/ui/shadcn";
import { useCommentCreateMutation } from "@features/feed/hooks/mutations/use-comment-create-mutation";

export function FeedCommentEditor({ feedId }: { feedId: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCommentCreateMutation({
      onSuccess: () => {
        setContent("");
      },
      onError: (error) => {
        toast.error("댓글 추가에 실패했습니다.", { position: "top-center" });
        console.error("댓글 추가 실패", error);
      },
    });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleCommentSubmitClick = () => {
    if (content.trim() === "") return;

    //댓글 추가 요청
    createComment({ feedId, content });
  };

  return (
    <div className="flex flex-row items-end gap-1">
      <Textarea
        className="scrollbar-none max-h-30 min-h-8.5 resize-none py-1.5 text-sm"
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글 남기기"
      />
      <Button
        variant="ghost"
        className="cursor-pointer"
        size="icon"
        onClick={handleCommentSubmitClick}
        disabled={isCreateCommentPending}
      >
        <CircleArrowUp
          strokeWidth={1}
          className="text-muted-foreground size-6.5"
        />
      </Button>
    </div>
  );
}
