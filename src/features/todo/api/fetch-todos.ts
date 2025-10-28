import { API_URL } from "@features/todo/api/end-points";
import type { Todo } from "@features/todo/types/todo";

export async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error("Fetch Failed");

  const data: Todo[] = await response.json();
  return data;
}
