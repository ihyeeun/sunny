import { PlusCircle } from "lucide-react";

import { useFeedEditorModalOpen } from "@shared/store/modals/feed-editor-modal";

export default function CreateFeedButton() {
  const modalOpen = useFeedEditorModalOpen();

  return (
    <div onClick={modalOpen} className="message-prompt cursor-pointer">
      <p className="text-muted-foreground text-sm">
        나누고 싶은 이야기가 있나요?
      </p>
      <PlusCircle className="text-muted-foreground size-5" />
    </div>
  );
}
