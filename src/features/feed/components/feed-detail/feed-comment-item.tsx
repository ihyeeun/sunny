import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

import { useOpenAlertModal } from "@shared/store/modals/alert-confirm-modal-store";
import { useSessionState } from "@shared/store/session";
import { Button, Popover } from "@shared/ui/shadcn";
import { PopoverContent, PopoverTrigger } from "@shared/ui/shadcn/popover";
import { formatTimeAgo } from "@shared/utils/time";
import { FeedCommentEditor } from "@features/feed/components/feed-detail/feed-comment-editor";
import { useCommentDeleteMutation } from "@features/feed/hooks/mutations/use-comment-delete-mutation";
import type { Comment } from "@features/feed/types/feed";

import defaultAvatar from "@/assets/default-avatar.png";

export function FeedCommentItem(comment: Comment) {
  const session = useSessionState();
  const openAlertModal = useOpenAlertModal();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useCommentDeleteMutation({
      onError: (error) => {
        toast.error("댓글 삭제에 실패했습니다.", { position: "top-center" });
        console.error("댓글 삭제 실패", error);
      },
    });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteComment = () => {
    openAlertModal({
      title: "댓글을 삭제하시겠습니까?",
      description: "삭제한 댓글은 되돌릴 수 없습니다.",
      onPositiveAction: () => deleteComment(comment.id),
    });
  };

  return (
    <div className="flex flex-row gap-2">
      <figure>
        <img
          src={comment.author.avatar_image ?? defaultAvatar}
          className="size-8 rounded-full border"
        />
      </figure>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex-1">
            <p className="text-[12px] font-semibold">
              {comment.author.nickname}
            </p>
            <time className="text-caption text-muted-foreground block leading-none">
              {formatTimeAgo(comment.created_at)}
            </time>
          </div>

          {session?.user.id === comment.author_id && (
            <Popover>
              {!isEditing && (
                <PopoverTrigger asChild>
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
              )}

              <PopoverContent className="text-muted-foreground flex w-fit cursor-pointer flex-col p-0 text-center text-sm">
                <PopoverClose
                  asChild
                  className="hover:bg-muted cursor-pointer px-4 py-2"
                  onClick={toggleIsEditing}
                >
                  <p>수정</p>
                </PopoverClose>
                <PopoverClose
                  asChild
                  className="hover:bg-muted cursor-pointer px-4 py-2"
                  onClick={handleDeleteComment}
                >
                  <p className="flex items-center gap-2">삭제</p>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {isEditing ? (
          <FeedCommentEditor
            mode={"EDIT"}
            commentId={comment.id}
            initialContent={comment.content}
            onClose={toggleIsEditing}
          />
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}

        <div>
          <p className="text-muted-foreground text-caption cursor-pointer hover:underline">
            댓글 남기기
          </p>
        </div>
      </div>
    </div>
  );
}
