import { Plus } from "lucide-react";

import { Button } from "@shared/ui/shadcn";
import { useOpenFeedEditorModal } from "@features/feed/store/feed-editor-modal";

export default function CreateFeedButton() {
  const modalOpen = useOpenFeedEditorModal();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 border">
      <div className="layout-container flex justify-end">
        <Button
          size="default"
          onClick={modalOpen}
          className="pointer-events-auto cursor-pointer rounded-4xl shadow-lg"
        >
          <Plus />
          글쓰기
        </Button>
      </div>
    </div>
  );
}
