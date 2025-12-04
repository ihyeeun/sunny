export const FEED_QUERY_KEYS = {
  feed: {
    all: ["feed"],
    list: (userId: string | null) => ["feed", "list", userId],
    byId: (feedId: number, userId: string | null) => [
      "feed",
      "byId",
      feedId,
      userId,
    ],
  },
};
