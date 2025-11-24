import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import FeedEditorModal from "@features/feed/components/feed-editor-modal";

export default function Modals({ children }: { children?: ReactNode }) {
  return (
    <>
      {createPortal(
        <FeedEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
