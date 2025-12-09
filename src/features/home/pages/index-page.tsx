import { useSessionState } from "@shared/store/session";
import { CreateFeedButton, FeedListPage } from "@features/feed";

export default function IndexPage() {
  const loginState = useSessionState();

  return (
    <div className="flex flex-col gap-4">
      {loginState && <CreateFeedButton />}
      <h2 className="visuallyhidden">Feed List</h2>
      <FeedListPage />
    </div>
  );
}
