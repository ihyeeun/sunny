import { Plus } from "lucide-react";

import { Button } from "@shared/ui/shadcn";
import { useOpenFeedEditorModal } from "@features/feed/store/feed-editor-modal";

export default function CreateFeedButton() {
  const modalOpen = useOpenFeedEditorModal();

  return (
    <Button
      size="default"
      onClick={modalOpen}
      className="fixed right-4 bottom-6 z-50 cursor-pointer rounded-4xl shadow-lg"
    >
      <Plus />
      글쓰기
    </Button>
  );
}
