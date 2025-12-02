import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const useFeedEditorModalStore = create(
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
    { name: "Feed Editor Modal Store" },
  ),
);

export const useFeedEditorModalOpen = () => {
  const modalOpen = useFeedEditorModalStore((store) => store.actions.modalOpen);
  return modalOpen;
};

export const useFeedEditorModal = () => {
  const {
    isOpen,
    actions: { modalOpen, modalClose },
  } = useFeedEditorModalStore();
  return { isOpen, modalOpen, modalClose };
};
