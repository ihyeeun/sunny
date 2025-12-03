import { useSessionState } from "@shared/store/session";
import { CreateFeedButton, FeedListPage } from "@features/feed";

export default function IndexPage() {
  const loginState = useSessionState();

  return (
    <div className="flex flex-col gap-4">
      {loginState && <CreateFeedButton />}
      <FeedListPage />
    </div>
  );
}
