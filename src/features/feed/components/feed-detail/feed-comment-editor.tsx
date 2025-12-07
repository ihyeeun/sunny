import { forwardRef, useEffect, useRef, useState } from "react";
import { CircleArrowUp } from "lucide-react";
import { toast } from "sonner";

import { Button, Textarea } from "@shared/ui/shadcn";
import { useCommentCreateMutation } from "@features/feed/hooks/mutations/use-comment-create-mutation";
import { useCommentUpdateMutation } from "@features/feed/hooks/mutations/use-comment-update-mutation";

interface CreateMode {
  mode: "CREATE";
  feedId: number;
}

interface EditMode {
  mode: "EDIT";
  commentId: number;
  initialContent: string;
  onClose: () => void;
}

interface ReflyMode {
  mode: "REFLY";
  feedId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose: () => void;
}

type CommentMode = CreateMode | EditMode | ReflyMode;

export function FeedCommentEditor(commentMode: CommentMode) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCommentCreateMutation({
      onSuccess: () => {
        setContent("");
        if (commentMode.mode === "REFLY") commentMode.onClose();
      },
      onError: (error) => {
        toast.error("댓글 추가에 실패했습니다.", { position: "top-center" });
        console.error("댓글 추가 실패", error);
      },
    });
  const { mutate: updateComment, isPending: isUpdateCommentPending } =
    useCommentUpdateMutation({
      onSuccess: () => {
        (commentMode as EditMode).onClose();
      },
      onError: (error) => {
        toast.error("댓글 수정에 실패했습니다.", { position: "top-center" });
        console.error("댓글 수정 실패", error);
      },
    });

  useEffect(() => {
    if (commentMode.mode === "EDIT") setContent(commentMode.initialContent);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleCommentSubmitClick = () => {
    if (content.trim() === "") return;

    if (commentMode.mode === "CREATE")
      createComment({ feedId: commentMode.feedId, content });
    else if (commentMode.mode === "EDIT") {
      if (content === commentMode.initialContent) {
        toast.info("변경된 내용이 없습니다.", { position: "top-center" });
        commentMode.onClose();
      }
      updateComment({ commentId: commentMode.commentId, content });
    } else {
      createComment({
        feedId: commentMode.feedId,
        content,
        parentCommentId: commentMode.parentCommentId,
        rootCommentId: commentMode.rootCommentId,
      });
    }
  };

  return (
    <div className="relative flex flex-row items-end gap-1">
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
        disabled={isCreateCommentPending || isUpdateCommentPending}
      >
        <CircleArrowUp
          strokeWidth={1}
          className="text-muted-foreground size-6.5"
        />
      </Button>

      {commentMode.mode === "EDIT" && (
        <div className="absolute -top-6 right-0 flex items-center">
          <button
            onClick={() => commentMode.onClose()}
            className="text-caption text-muted-foreground/55 cursor-pointer underline"
            disabled={isCreateCommentPending || isUpdateCommentPending}
          >
            수정 취소
          </button>
        </div>
      )}

      {commentMode.mode === "REFLY" && (
        <div className="absolute -top-5 right-0 flex items-center">
          <button
            onClick={() => commentMode.onClose()}
            className="text-caption text-muted-foreground/55 cursor-pointer underline"
            disabled={isCreateCommentPending || isUpdateCommentPending}
          >
            답글 취소
          </button>
        </div>
      )}
    </div>
  );
}
