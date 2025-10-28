import { useCreateTodoMutation } from "@features/todo/hooks/mutations/use-create-todo";
import { Button } from "@shared/ui/shadcn/button";
import { Input } from "@shared/ui/shadcn/input";
import { useState } from "react";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [content, setContent] = useState("");
  const handleAddClick = () => {
    if (content.trim() === "") return;
    mutate(content);
    setContent("");
  };

  return (
    <div className="flex gap-3">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 작성하세요"
      />
      <Button
        disabled={isPending}
        onClick={handleAddClick}
        className="cursor-pointers"
      >
        추가
      </Button>
    </div>
  );
}
