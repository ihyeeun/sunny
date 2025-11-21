import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        modalOpen: () => {
          set({ isOpen: true });
        },
        modalClose: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "Post Editor Modal Store" },
  ),
);

export const usePostEditorModalOpen = () => {
  const modalOpen = usePostEditorModalStore((store) => store.actions.modalOpen);
  return modalOpen;
};

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { modalOpen, modalClose },
  } = usePostEditorModalStore();
  return { isOpen, modalOpen, modalClose };
};
