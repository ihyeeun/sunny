import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import PostEditorModal from "@features/post/components/post-editor-modal";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
