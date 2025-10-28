import { useCount, useDecrease, useIncrease } from "@shared/store/count";
import { Button } from "@shared/ui/shadcn/button";

export default function CountPage() {
  const count = useCount();
  const increase = useIncrease();
  const decrease = useDecrease();

  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <div>{count}</div>
      <div>
        <Button onClick={increase}>+</Button>
        <Button onClick={decrease}>-</Button>
      </div>
    </div>
  );
}
