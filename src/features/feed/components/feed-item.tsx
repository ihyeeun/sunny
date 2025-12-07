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

  if (isFeedItemPending) return <GlobalLoaded />;
  if (error || !feed) return <Fallback />;

  const isMine = session?.user.id === feed.author_id;

  return (
    <article className="flex flex-col gap-4 p-3">
      <header className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <Link to={PATH.PROFILE.DETAIL_LINK(feed.author_id)}>
            <img
              src={feed.author.avatar_image ?? defaultAvatar}
              alt={`${feed.author.nickname}의 프로필 이미지`}
              className="size-8 rounded-full border object-cover"
            />
          </Link>
          <div>
            <Link to={PATH.PROFILE.DETAIL_LINK(feed.author_id)}>
              <p className="text-[12px]">{feed.author.nickname}</p>
            </Link>
            <time className="text-muted-foreground text-caption block leading-none">
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
                  />
                </div>
              ))}
            </figure>
          )}

          <p className="line-clamp-2 text-sm whitespace-pre-wrap">
            {feed.content}
          </p>
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
                  />
                </div>
              ))}
            </figure>
          )}

          <p className="line-clamp-2 text-sm whitespace-pre-wrap">
            {feed.content}
          </p>
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
            >
              <MessageCircleMore className="size-4" />
            </Button>
          </Link>
        )}
      </footer>
    </article>
  );
}
