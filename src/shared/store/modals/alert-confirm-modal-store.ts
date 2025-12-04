import { create } from "zustand";
import { combine } from "zustand/middleware";

interface OpenState {
  isOpen: true;
  title: string;
  description: string;
  onPositiveAction?: () => void;
  onNegativeAction?: () => void;
}
interface CloseState {
  isOpen: false;
}

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const useConfirmModalStore = create(
  combine(initialState, (set) => ({
    actions: {
      modalOpen: (params: Omit<OpenState, "isOpen">) => {
        set({ ...params, isOpen: true });
      },
      modalClose: () => {
        set({ isOpen: false });
      },
    },
  })),
);

export const useOpenAlertModal = () => {
  const open = useConfirmModalStore((store) => store.actions.modalOpen);
  return open;
};

export const useAlertModal = () => {
  const store = useConfirmModalStore();
  return store as typeof store & State;
};
