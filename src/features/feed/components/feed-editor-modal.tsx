import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { useFeedEditorModal } from "@shared/store/modals/feed-editor-modal";
import { Button, Dialog } from "@shared/ui/shadcn";
import { DialogContent, DialogTitle } from "@shared/ui/shadcn/dialog";
import { useFeedCreateMutation } from "@features/feed/hooks/mutations/use-feed-create-mutation";

export default function FeedEditorModal() {
  const { isOpen, modalClose } = useFeedEditorModal();
  const { mutate: feedCreate, isPending: isFeedCreating } =
    useFeedCreateMutation({
      onSuccess: () => {
        modalClose();
      },
      onError: (error) => {
        toast.error("피드 작성에 실패했습니다. 다시 시도해주세요.", {
          position: "top-center",
        });
        console.error("Feed creation error:", error);
      },
    });
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleModalClose = () => {
    modalClose();
  };

  const handlePostSave = () => {
    if (content.trim() === "") return;
    feedCreate(content);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    setContent("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>공유하고 싶은 내용을 적어주세요.</DialogTitle>
        <textarea
          className="max-h-90 min-h-50 rounded-sm border p-2 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaRef}
          disabled={isFeedCreating}
        />
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isFeedCreating}
        >
          <ImageIcon />
          <p>이미지 추가</p>
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handlePostSave}
          disabled={isFeedCreating}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
