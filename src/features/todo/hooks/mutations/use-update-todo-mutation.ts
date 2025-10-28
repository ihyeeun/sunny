import { QUERY_KEYS } from "@features/todo/api/end-points";
import { updateTodo } from "@features/todo/api/update-todo";
import type { Todo } from "@features/todo/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    // 여기에 매개변수로 들어가는 updatedTodo는 이 함수를 호출하면서 넘겨주는 props 값이 들어온다.
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.TODO.list],
      }); // 수정하고 있는 중에 만약 query key 값을 가진 네트워크 요청이 있으면 취소시키는 방식.

      const previousTodos = queryClient.getQueryData<Todo[]>(
        QUERY_KEYS.TODO.list,
      );
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.TODO.list, (oldTodos) => {
        if (!oldTodos) return [];
        return oldTodos.map((oldTodo) =>
          oldTodo.id === updatedTodo.id
            ? { ...oldTodo, ...updatedTodo }
            : oldTodo,
        );
      });
      return { previousTodos };
    },
    onError: (error, variable, context) => {
      if (context && context.previousTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.TODO.list,
          context.previousTodos,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TODO.list,
      });
      // 이렇게 요청이 끝난 지점에서 저장되어있던 캐시 데이터를 무효화 시킴으로서 서버에 있는 데이터를 가져와서 렌더링 할 수 있도록 해주는 것임 !
    },
  });
}
