import { createTodo } from "@features/todo/api/create-todo";
import { QUERY_KEYS } from "@features/todo/api/end-points";
import type { Todo } from "@features/todo/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODO.list });
      // 이 방법은 캐싱 데이터를 무력화하였기에 재캐싱하는 로직을 진행하는 것임.
      // 새로

      // 이 방법이 왜 리패칭없이 데이터가 추가되는 렌더링이 되는거지 ?
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.TODO.list, (oldTodos) => {
        return oldTodos ? [...oldTodos, newTodo] : [newTodo];
      });
      // 네트워크를 거치지 않고 캐시데이터를 구독하고 있는 컴포넌트에게 전달만 시켜주기에 렌더링이 되는거구나.
    },
  });
}
