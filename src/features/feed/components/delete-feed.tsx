import { useNavigate } from "react-router";
import { toast } from "sonner";

import { PATH } from "@shared/constants/path";
import { useOpenAlertModal } from "@shared/store/modals/alert-confirm-modal-store";
import { Button } from "@shared/ui/shadcn";
import { useFeedDeleteMutation } from "@features/feed/hooks/mutations/use-feed-delete-mutation";

export function DeleteFeed({ feedId }: { feedId: number }) {
  const navigate = useNavigate();
  const { mutate: FeedDelete, isPending: isDeleteFeedPending } =
    useFeedDeleteMutation({
      onSuccess: () => {
        const pathname = window.location.pathname;
        if (pathname.startsWith(PATH.FEED.DETAIL_LINK(feedId))) {
          navigate(PATH.ROOT, { replace: true });
        }
      },
      onError: (error) => {
        toast.error("포스트 삭제에 실패했습니다.", { position: "top-center" });
        console.error("포스트 삭제 실패", error);
      },
    });
  const openAlertModal = useOpenAlertModal();

  const handleDeleteClick = () => {
    openAlertModal({
      title: "피드 삭제",
      description: "삭제된 피드는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositiveAction: () => {
        FeedDelete(feedId);
      },
    });
  };

  return (
    <Button
      variant="ghost"
      className="text-muted-foreground h-fit w-fit cursor-pointer p-2 py-1 text-[10px]"
      onClick={handleDeleteClick}
      disabled={isDeleteFeedPending}
    >
      삭제
    </Button>
  );
}
