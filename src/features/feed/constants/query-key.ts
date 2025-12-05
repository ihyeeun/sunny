export const FEED_QUERY_KEYS = {
  feed: {
    all: ["feed"],
    list: (params?: { authorId?: string; userId?: string | null }) => [
      "feed",
      "list",
      params ?? {},
    ],
    byId: (feedId: number, userId: string | null) => [
      "feed",
      "byId",
      feedId,
      userId,
    ],
  },
};
