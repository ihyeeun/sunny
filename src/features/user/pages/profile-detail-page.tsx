import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

import { PATH } from "@shared/constants/path";
import { FeedListPage } from "@features/feed";
import ProfileInfo from "@features/user/components/profile-info";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!userId) return <Navigate to={PATH.ROOT} replace />;

  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className="visuallyhidden">User Profile</h2>
      <ProfileInfo userId={userId} />

      <div className="h-0.5 w-full bg-gray-100" />

      <section aria-labelledby="user-feed-heading">
        <h2 id="user-feed-heading" className="visuallyhidden">
          User Posts
        </h2>
        <FeedListPage authorId={userId} />
      </section>
    </div>
  );
}
