import { QUERY_KEYS } from "@features/todo/api/end-points";
import { fetchTodos } from "@features/todo/api/fetch-todos";
import type { Todo } from "@features/todo/types/todo";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodosData() {
  const queryClient = useQueryClient();
  return useQuery({
    queryFn: async () => {
      const todos = await fetchTodos();
      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.TODO.detail(todo.id), todo);
      });
    },
    queryKey: QUERY_KEYS.TODO.list,
  });
}
