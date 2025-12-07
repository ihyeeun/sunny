import type {
  CommentEntity,
  FeedEntity,
  ProfileEntity,
} from "@shared/types/database.types";
import type { FEED_ITEM_TYPE } from "@features/feed/constants/constant";

type FeedItemProfile = Pick<ProfileEntity, "avatar_image" | "nickname">;

export type FeedItem = FeedEntity & {
  author: FeedItemProfile;
  isFeedLiked: boolean;
};

export type FeedItemType = (typeof FEED_ITEM_TYPE)[keyof typeof FEED_ITEM_TYPE];

export type Comment = CommentEntity & { author: FeedItemProfile };
