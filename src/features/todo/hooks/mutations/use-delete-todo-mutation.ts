import { deleteTodo } from "@features/todo/api/delete-todo";
import { QUERY_KEYS } from "@features/todo/api/end-points";
import type { Todo } from "@features/todo/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usedeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (delTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.TODO.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.filter((prevTodo) => prevTodo.id !== delTodo.id);
      });
      // 데이터를 삭제하기 위해서 onSuccess 안에서 캐시 데이터를 수정하는 방식으로 진행하였음.
      // 이는 요청이 성공했지만 리패칭하지 않기 위해서 사용하기 위함 ! 네트워크 부하를 줄이기 위함 ~
    },
  });
}
