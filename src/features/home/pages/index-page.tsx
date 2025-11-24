import { useSessionState } from "@shared/store/session";
import CreateFeedButton from "@features/feed/components/create-feed-button";

export default function IndexPage() {
  const loginState = useSessionState();

  return (
    <div className="flex flex-col">{loginState && <CreateFeedButton />}</div>
  );
}
