import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

import type { ProfileEntity } from "@shared/types/database.types";

const initialState = {
  isOpen: false,
  profile: null as ProfileEntity | null,
};

const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        modalOpen: (profile: ProfileEntity) => set({ isOpen: true, profile }),
        modalClose: () => set({ isOpen: false, profile: null }),
      },
    })),
    { name: "profileEditorModalStore" },
  ),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.modalOpen);
  return open;
};

export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();
  return store;
};
