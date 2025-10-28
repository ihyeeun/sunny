import { QUERY_KEYS } from "@features/todo/api/end-points";
import { fetchTodoById } from "@features/todo/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.TODO.detail(id),
    staleTime: 5000,
  });
}
