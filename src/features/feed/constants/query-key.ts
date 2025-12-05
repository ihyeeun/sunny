export const FEED_QUERY_KEYS = {
  feed: {
    all: () => ["feed"] as const,
    viewer: (viewerId: string | null) =>
      [...FEED_QUERY_KEYS.feed.all(), viewerId ?? "guest"] as const,
    lists: (viewerId: string | null) =>
      [...FEED_QUERY_KEYS.feed.viewer(viewerId), "lists"] as const,
    list: ({
      viewerId,
      authorId,
    }: {
      viewerId: string | null;
      authorId?: string | null;
    }) =>
      [
        ...FEED_QUERY_KEYS.feed.lists(viewerId),
        authorId ?? "timeline",
      ] as const,
    details: (viewerId: string | null) =>
      [...FEED_QUERY_KEYS.feed.viewer(viewerId), "details"] as const,
    byId: (feedId: number, viewerId: string | null) =>
      [...FEED_QUERY_KEYS.feed.details(viewerId), feedId] as const,
  },
} as const;
