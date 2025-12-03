import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

interface CreateMode {
  isOpen: true;
  type: "CREATE";
}

interface ModifyMode {
  isOpen: true;
  type: "MODIFY";
  feedId: number;
  content: string;
  imageUrls: string[];
}

type OpenState = CreateMode | ModifyMode;
interface CloseState {
  isOpen: false;
}

type ModalState = OpenState | CloseState;

const initialState = {
  isOpen: false,
} as ModalState;

const useFeedEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreateModal: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        openModifyModal: (param: Omit<ModifyMode, "isOpen" | "type">) => {
          set({ isOpen: true, type: "MODIFY", ...param });
        },
        modalClose: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "Feed Editor Modal Store" },
  ),
);

export const useOpenFeedEditorModal = () => {
  const editorModalOpen = useFeedEditorModalStore(
    (store) => store.actions.openCreateModal,
  );
  return editorModalOpen;
};

export const useOpenModifyFeedModal = () => {
  const modifyModalOpen = useFeedEditorModalStore(
    (store) => store.actions.openModifyModal,
  );
  return modifyModalOpen;
};

export const useFeedEditorModal = () => {
  const feedEditorModal = useFeedEditorModalStore();
  return feedEditorModal as typeof feedEditorModal & ModalState;
};
