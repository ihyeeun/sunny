import { create } from "zustand";
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            increaseOne: () => {
              set((state) => {
                state.count += 1;
              });
            },
            decreaseOne: () => {
              set((state) => {
                state.count -= 1;
              });
            },
          })),
        ),
      ),
      {
        name: "count-storage",
        partialize: (state) => ({ count: state.count }), // actions 같은 함수같은 건 저장하지 않음. 이유는 json 만 저장하기에. 그래서 필요한 값만 storage에 저장해서 사용해야한다. 안그러면 action 함수 같은 것들이 동작하지 않게 된다.
        storage: createJSONStorage(() => sessionStorage), // sessionStorage 에 저장
      },
    ),
    {
      name: "CountStoreName",
    },
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    console.log("count changed:", { count, prevCount });
  },
);
// type Store = {
//   count: number;
//   increase: () => void;
//   decrease: () => void;
// };

// export const useCountStore = create<Store>((set, get) => {
//   return {
//     count: 0,
//     increase: () => {
//       set((store) => ({
//         count: store.count + 1,
//       }));
//     },
//     decrease: () => {
//       set((store) => ({
//         count: store.count - 1,
//       }));
//     },
//   };
// });

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncrease = () => {
  const increase = useCountStore((store) => store.increaseOne);
  return increase;
};

export const useDecrease = () => {
  const decrease = useCountStore((store) => store.decreaseOne);
  return decrease;
};
