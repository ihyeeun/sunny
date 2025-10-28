import { API_URL } from "@features/todo/api/end-points";
import type { Todo } from "@features/todo/types/todo";

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  const data: Todo = await response.json();
  return data;
}
