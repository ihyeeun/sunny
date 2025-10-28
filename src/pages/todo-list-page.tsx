import TodoEditor from "@features/todo/components/todo-editor";
import TodoItem from "@features/todo/components/todo-item";
import { useTodosData } from "@features/todo/hooks/queries/use-todos-data";

export default function TodoListPage() {
  const { data: todoIds, isLoading, error } = useTodosData();
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <TodoEditor />
      {todoIds?.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </div>
  );
}
