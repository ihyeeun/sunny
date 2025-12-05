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
    <div className="flex flex-col gap-8">
      <ProfileInfo userId={userId} />
      <div className="h-1 w-full bg-black/10" />
      <FeedListPage authorId={userId} />
    </div>
  );
}
