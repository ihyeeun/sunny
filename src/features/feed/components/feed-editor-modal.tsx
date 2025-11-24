import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

import { useFeedEditorModal } from "@shared/store/modals/feed-editor-modal";
import { Button, Dialog } from "@shared/ui/shadcn";
import { DialogContent, DialogTitle } from "@shared/ui/shadcn/dialog";

export default function FeedEditorModal() {
  const { isOpen, modalClose } = useFeedEditorModal();
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleModalClose = () => {
    modalClose();
  };

  const handlePostSave = () => {
    if (content.trim() === "") return;
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
        />
        <Button variant="outline" className="cursor-pointer">
          <ImageIcon />
          <p>이미지 추가</p>
        </Button>
        <Button className="cursor-pointer">저장</Button>
      </DialogContent>
    </Dialog>
  );
}
