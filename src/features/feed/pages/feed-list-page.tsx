import { Fallback, GlobalLoaded } from "@shared/ui/common";
import { FeedItem } from "@features/feed/components/feed-item";
import { useFeedListQuery } from "@features/feed/hooks/queries/use-feed-list-query";

export default function FeedListPage() {
  const { data: feedList, error, isPending } = useFeedListQuery();

  if (error) return <Fallback />;
  if (isPending) return <GlobalLoaded />;

  return (
    <ul className="flex flex-col gap-4">
      {feedList.map((feed) => (
        <li key={feed.id}>
          <FeedItem {...feed} />
          <div className="mt-4 h-0.5 w-full bg-gray-100" />
        </li>
      ))}
    </ul>
  );
}
