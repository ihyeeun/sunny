import { API_URL } from "@features/todo/api/end-points";
import type { Todo } from "@features/todo/types/todo";

export async function createTodo(content: string) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      content,
      completed: false,
    }),
  });
  if (!response.ok) throw new Error("Create Todo Failed");

  const data: Todo = await response.json();
  return data;
}
