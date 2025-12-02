import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { useFeedEditorModal } from "@shared/store/modals/feed-editor-modal";
import { useSessionState } from "@shared/store/session";
import { Button, Dialog } from "@shared/ui/shadcn";
import { DialogContent, DialogTitle } from "@shared/ui/shadcn/dialog";
import { useFeedCreateMutation } from "@features/feed/hooks/mutations/use-feed-create-mutation";

interface Image {
  file: File;
  previewUrl: string;
}

export default function FeedEditorModal() {
  const session = useSessionState();
  const { isOpen, modalClose } = useFeedEditorModal();
  const { mutate: insertFeed, isPending: isFeedCreating } =
    useFeedCreateMutation({
      onSuccess: () => {
        modalClose();
      },
      onError: (error) => {
        toast.error("피드 작성에 실패했습니다. 다시 시도해주세요.", {
          position: "top-center",
        });
        console.error("Feed creation error:", error);
      },
    });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModalClose = () => {
    modalClose();
  };

  const handleFeedSave = () => {
    if (content.trim() === "") {
      toast.error("내용을 입력해주세요.", { position: "top-center" });
      return;
    }
    insertFeed({
      content,
      images: images.map((img) => img.file),
      userId: session!.user.id,
    });
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
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    setContent("");
    setImages([]);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>공유하고 싶은 내용을 적어주세요.</DialogTitle>
        <textarea
          className="max-h-90 min-h-50 rounded-sm border p-2 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaRef}
          disabled={isFeedCreating}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleSelectImages}
        />
        {images.length > 0 && (
          <figure className="flex h-[100px] touch-pan-x touch-auto gap-4 overflow-x-auto">
            {images.map((image) => (
              <div
                key={image.previewUrl}
                className="relative h-full shrink-0 basis-2/5"
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
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isFeedCreating}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <ImageIcon />
          <p>이미지 추가</p>
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handleFeedSave}
          disabled={isFeedCreating}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
