import { PlusCircle } from "lucide-react";

import { usePostEditorModalOpen } from "@shared/store/modals/post-editor-modal";

export default function CreatePostButton() {
  const modalOpen = usePostEditorModalOpen();

  return (
    <div onClick={modalOpen} className="message-prompt cursor-pointer">
      <p className="text-muted-foreground text-sm">
        나누고 싶은 이야기가 있나요?
      </p>
      <PlusCircle className="text-muted-foreground size-5" />
    </div>
  );
}
