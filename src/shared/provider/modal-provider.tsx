import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import AlertConfirmModal from "@shared/ui/common/modals/alert-confirm-modal";
import FeedEditorModal from "@features/feed/components/feed-editor-modal";

export default function Modals({ children }: { children?: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <AlertConfirmModal />
          <FeedEditorModal />,
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
