import { usedeleteTodoMutation } from "@features/todo/hooks/mutations/use-delete-todo-mutation";
import useUpdateTodoMutation from "@features/todo/hooks/mutations/use-update-todo-mutation";
import { useTodoDataById } from "@features/todo/hooks/queries/use-todo-data-by-id";
import { PATH } from "@shared/constants/path";
import { Button } from "@shared/ui/shadcn/button";
import { Link } from "react-router";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id);
  if (!todo) throw new Error("Todo data undefined");
  const { content, complete } = todo;

  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    usedeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  const handleCheckboxClick = () => {
    updateTodo({
      id,
      complete: !complete,
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-2">
        <input
          onClick={handleCheckboxClick}
          type={"checkbox"}
          checked={complete}
          disabled={isDeleteTodoPending}
        />
        <Link to={`${PATH.TODO_LIST}/${id}`}>{content}</Link>
      </div>
      <Button
        onClick={handleDeleteClick}
        variant={"destructive"}
        disabled={isDeleteTodoPending}
      >
        삭제
      </Button>
    </div>
  );
}
