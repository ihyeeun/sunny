import { API_URL } from "@features/todo/api/end-points";
import type { Todo } from "@features/todo/types/todo";

export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  const data: Todo = await response.json();
  return data;
}
