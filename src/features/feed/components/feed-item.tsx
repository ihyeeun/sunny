import { useEffect, useRef, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router";

import { PATH } from "@shared/constants/path";
import { useSessionState } from "@shared/store/session";
import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { Button } from "@shared/ui/shadcn";
import { formatTimeAgo } from "@shared/utils/time";
import { DeleteFeed } from "@features/feed/components/delete-feed";
import FeedLikeButton from "@features/feed/components/feed-like-button";
import ModifyFeed from "@features/feed/components/modify-feed";
import { FEED_ITEM_TYPE } from "@features/feed/constants/constant";
import { useFeedByIdQuery } from "@features/feed/hooks/queries/use-feed-by-id-query";
import type { FeedItem, FeedItemType } from "@features/feed/types/feed";

import defaultAvatar from "@/assets/default-avatar.png";

export function FeedItem({
  feedId,
  feedItemType,
}: {
  feedId: number;
  feedItemType: FeedItemType;
}) {
  const session = useSessionState();
  const {
    data: feed,
    error,
    isPending: isFeedItemPending,
  } = useFeedByIdQuery({
    feedId,
    feedItemType: feedItemType,
  });

  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (el.scrollHeight > el.clientHeight) {
      setIsClamped(true);
    }
  }, [feed?.content]);

  if (isFeedItemPending) return <GlobalLoaded />;
  if (error || !feed) return <Fallback />;

  const isMine = session?.user.id === feed.author_id;

  return (
    <article
      className="flex flex-col gap-4 p-3"
      aria-label={
        feedItemType === FEED_ITEM_TYPE.DETAIL
          ? `${feed.author.nickname}님의 게시글 상세`
          : `${feed.author.nickname}님의 게시글`
      }
    >
      <header className="flex justify-between">
        <div className="flex min-w-0 shrink items-center gap-1.5">
          <Link
            to={PATH.PROFILE.DETAIL_LINK(feed.author_id)}
            aria-label={`${feed.author.nickname}님의 프로필로 이동`}
          >
            <img
              src={feed.author.avatar_image ?? defaultAvatar}
              alt={`${feed.author.nickname}의 프로필 이미지`}
              className="size-8 shrink-0 rounded-full object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link to={PATH.PROFILE.DETAIL_LINK(feed.author_id)}>
              <p className="line-clamp-1 truncate text-[12px]">
                {feed.author.nickname}
              </p>
            </Link>
            <time
              dateTime={feed.created_at}
              className="text-muted-foreground text-caption block leading-none"
            >
              {formatTimeAgo(feed.created_at)}
            </time>
          </div>
        </div>
        {isMine && (
          <div className="flex items-start">
            <ModifyFeed {...feed} />
            <DeleteFeed feedId={feed.id} />
          </div>
        )}
      </header>

      {feedItemType === FEED_ITEM_TYPE.LIST ? (
        <Link to={PATH.FEED.DETAIL_LINK(feed.id)}>
          {feed.image_urls && (
            <figure className="scrollbar-none flex touch-pan-x touch-auto gap-2 overflow-x-scroll">
              {feed.image_urls.map((url, index) => (
                <div
                  key={index}
                  className="aspect-square max-h-[180px] max-w-[180px] shrink-0 basis-2/5"
                >
                  <img
                    src={url}
                    className="size-full rounded-sm object-cover"
                    alt={`게시글 이미지 ${index + 1}`}
                  />
                </div>
              ))}
            </figure>
          )}

          <p
            className="line-clamp-4 text-sm whitespace-pre-wrap"
            ref={contentRef}
          >
            {feed.content}
          </p>

          {isClamped && (
            <button
              className="text-muted-foreground text-end text-sm underline"
              aria-label="게시글 전체 내용을 자세히 보기"
            >
              더보기
            </button>
          )}
        </Link>
      ) : (
        <div>
          {feed.image_urls && (
            <figure className="scrollbar-none flex touch-pan-x touch-auto gap-2 overflow-x-scroll">
              {feed.image_urls.map((url, index) => (
                <div
                  key={index}
                  className="aspect-square max-h-[180px] max-w-[180px] shrink-0 basis-2/5"
                >
                  <img
                    src={url}
                    className="size-full rounded-sm object-cover"
                    alt={`게시글 이미지 ${index + 1}`}
                  />
                </div>
              ))}
            </figure>
          )}

          <p className="text-sm whitespace-pre-wrap">{feed.content}</p>
        </div>
      )}

      <footer className="flex flex-row gap-2">
        <FeedLikeButton
          feedId={feed.id}
          likeCount={feed.like_cnt}
          isFeedLiked={feed.isFeedLiked}
        />
        {feedItemType === FEED_ITEM_TYPE.LIST && (
          <Link to={PATH.FEED.DETAIL_LINK(feed.id)}>
            <Button
              variant="ghost"
              className="h-fit w-fit cursor-pointer p-1"
              size="icon"
              aria-label="게시물 상세 보기"
            >
              <MessageCircleMore className="size-4" />
            </Button>
          </Link>
        )}
      </footer>
    </article>
  );
}
