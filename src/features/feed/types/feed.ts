import type { FeedEntity, ProfileEntity } from "@shared/types/database.types";

type FeedItemProfile = Pick<ProfileEntity, "avatar_image" | "nickname">;

export type FeedItem = FeedEntity & { author: FeedItemProfile };
