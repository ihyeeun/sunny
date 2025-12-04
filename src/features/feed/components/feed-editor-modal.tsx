import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { useOpenAlertModal } from "@shared/store/modals/alert-confirm-modal-store";
import { useSessionState } from "@shared/store/session";
import { Button, Dialog } from "@shared/ui/shadcn";
import { DialogContent, DialogTitle } from "@shared/ui/shadcn/dialog";
import { useFeedCreateMutation } from "@features/feed/hooks/mutations/use-feed-create-mutation";
import { useFeedUpdateMutation } from "@features/feed/hooks/mutations/use-feed-update-mutation";
import { useFeedEditorModal } from "@features/feed/store/feed-editor-modal";

interface Image {
  file: File;
  previewUrl: string;
}

export default function FeedEditorModal() {
  const session = useSessionState();
  const openAlertModal = useOpenAlertModal();
  const feedEditorModal = useFeedEditorModal();
  const { mutate: insertFeed, isPending: isFeedCreating } =
    useFeedCreateMutation({
      onSuccess: () => {
        toast.success("피드 생성에 성공했습니다.", { position: "top-center" });
        feedEditorModal.actions.modalClose();
      },
      onError: (error) => {
        toast.error("피드 작성에 실패했습니다. 다시 시도해주세요.", {
          position: "top-center",
        });
        console.error("Feed creation error:", error);
      },
    });
  const { mutate: updateFeed, isPending: isFeedModifying } =
    useFeedUpdateMutation({
      onSuccess: () => {
        feedEditorModal.actions.modalClose();
        toast.success("피드 수정에 성공했습니다.", { position: "top-center" });
      },
      onError: (error) => {
        toast.error("피드 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModalClose = () => {
    if (!feedEditorModal.isOpen) return;

    const isCreate =
      feedEditorModal.type === "CREATE" &&
      (content.trim() !== "" || images.length > 0);

    const isModify =
      feedEditorModal.type === "MODIFY" && feedEditorModal.content !== content;

    if (isCreate || isModify) {
      openAlertModal({
        title: "피드 작성을 종료하시겠습니까?",
        description: "작성 중인 내용이 사라집니다.",
        onPositiveAction: () => {
          feedEditorModal.actions.modalClose();
        },
      });
      return;
    }

    feedEditorModal.actions.modalClose();
  };

  const handleFeedSave = () => {
    if (content.trim() === "") {
      toast.error("내용을 입력해주세요.", { position: "top-center" });
      return;
    }

    if (!feedEditorModal.isOpen) return;

    if (feedEditorModal.type === "CREATE") {
      insertFeed({
        content,
        images: images.map((img) => img.file),
        userId: session!.user.id,
      });
    } else if (feedEditorModal.type === "MODIFY") {
      if (feedEditorModal.content === content) {
        toast.info("변경된 내용이 없습니다.", {
          position: "top-center",
        });
        return feedEditorModal.actions.modalClose();
      }
      updateFeed({ id: feedEditorModal.feedId, content: content });
    }
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );
    URL.revokeObjectURL(image.previewUrl);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!feedEditorModal.isOpen) {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });

      return;
    }
    if (feedEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else if (feedEditorModal.type === "MODIFY") {
      setContent(feedEditorModal.content);
      //TODO 이미지 수정되는 거 넣어보기
      setImages([]);
    }
  }, [feedEditorModal.isOpen]);

  const isPending = isFeedCreating || isFeedModifying;

  return (
    <Dialog open={feedEditorModal.isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>공유하고 싶은 내용을 적어주세요.</DialogTitle>
        <textarea
          className="max-h-90 min-h-50 rounded-sm border p-2 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaRef}
          disabled={isPending}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleSelectImages}
        />
        {feedEditorModal.isOpen && feedEditorModal.type === "MODIFY" && (
          <figure className="scrollbar-none flex touch-pan-x touch-auto gap-2 overflow-x-scroll">
            {feedEditorModal.imageUrls?.map((url) => (
              <div
                key={url}
                className="aspect-square max-h-[180px] max-w-[180px] shrink-0 basis-2/5"
              >
                <img src={url} className="size-full rounded-sm object-cover" />
              </div>
            ))}
          </figure>
        )}
        {images.length > 0 && (
          <figure className="scrollbar-none flex touch-pan-x touch-auto gap-2 overflow-x-scroll">
            {images.map((image) => (
              <div
                key={image.previewUrl}
                className="relative aspect-square max-h-[180px] max-w-[180px] shrink-0 basis-2/5"
              >
                <img
                  src={image.previewUrl}
                  className="size-full rounded-sm object-cover"
                />
                <div className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1">
                  <XIcon
                    className="size-2 text-white/70"
                    onClick={() => handleDeleteImage(image)}
                  />
                </div>
              </div>
            ))}
          </figure>
        )}
        {feedEditorModal.isOpen && feedEditorModal.type === "CREATE" && (
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <ImageIcon />
            <p>이미지 추가</p>
          </Button>
        )}
        <Button
          className="cursor-pointer"
          onClick={handleFeedSave}
          disabled={isPending}
        >
          {feedEditorModal.isOpen && feedEditorModal.type === "CREATE"
            ? "생성하기"
            : "수정하기"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
