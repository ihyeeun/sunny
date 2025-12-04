import type { FeedEntity } from "@shared/types/database.types";
import { Button } from "@shared/ui/shadcn";
import { useOpenModifyFeedModal } from "@features/feed/store/feed-editor-modal";

export default function ModifyFeed(feed: FeedEntity) {
  const openFeedModifyModal = useOpenModifyFeedModal();
  const handleModifyModalOpen = () => {
    openFeedModifyModal({
      feedId: feed.id,
      content: feed.content,
      imageUrls: feed.image_urls ?? [],
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleModifyModalOpen}
      className="text-muted-foreground h-fit w-fit cursor-pointer p-2 py-1 text-[10px]"
    >
      수정
    </Button>
  );
}
