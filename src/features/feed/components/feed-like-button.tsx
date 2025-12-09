import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useSessionState } from "@shared/store/session";
import { Button } from "@shared/ui/shadcn";
import useFeedLikeToggleMutation from "@features/feed/hooks/mutations/use-feed-like-toggle-mutation";

export default function FeedLikeButton({
  feedId,
  likeCount,
  isFeedLiked,
}: {
  feedId: number;
  likeCount: number;
  isFeedLiked: boolean;
}) {
  const session = useSessionState();
  const userId = session?.user.id;
  const { mutate: toggleFeedLike } = useFeedLikeToggleMutation({
    onError: (error) => {
      toast.error("좋아요 요청에 실패했습니다.", { position: "top-center" });
      console.error(error);
    },
  });

  const handleFeedLikeClick = () => {
    if (userId !== undefined) {
      toggleFeedLike({ feedId: feedId, userId: userId });
    } else {
      //TODO 로그인 모달 띄우게 하는 것이 좋아보임 !
      toast.warning("로그인 이후에 사용할 수 있습니다.", {
        position: "top-center",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      className="h-fit w-fit cursor-pointer p-1"
      size="icon"
      onClick={handleFeedLikeClick}
      aria-label={isFeedLiked ? "좋아요 취소하기" : "좋아요 누르기"}
    >
      <Heart
        className={`size-4 ${isFeedLiked && "fill-foreground border-foreground"}`}
      />
      {likeCount !== 0 && <span className="text-xs">{likeCount}</span>}
    </Button>
  );
}
