import { TriangleAlert } from "lucide-react";
interface FallbackProps {
  message?: string;
}

export default function Fallback({ message }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-2"
    >
      <TriangleAlert
        strokeWidth={1.3}
        className="text-destructive size-6"
        aria-hidden="true"
      />
      <p>{message ?? "오류가 발생했습니다. 잠시 후 다시 시도해주세요."}</p>
    </div>
  );
}
