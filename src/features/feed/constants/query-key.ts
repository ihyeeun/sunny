export const FEED_QUERY_KEYS = {
  feed: {
    all: ["feed"],
    list: ["feed", "list"],
    byId: (feedId: number) => ["feed", "byId", feedId],
  },
};
