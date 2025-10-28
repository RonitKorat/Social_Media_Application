import { useState, useEffect } from "react";
import { followUser, unfollowUser, isFollowing } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthContext";

const FollowButton = ({ targetUserId }: { targetUserId: string }) => {
  const { user } = useUserContext();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (user?.id && targetUserId) {
      isFollowing(user.id, targetUserId).then(setFollowing);
    }
  }, [user, targetUserId]);

  const handleFollow = async () => {
    if (following) {
      await unfollowUser(user.id, targetUserId);
      setFollowing(false);
    } else {
      await followUser(user.id, targetUserId);
      setFollowing(true);
    }
  };

  if (user.id === targetUserId) return null; // Don't show for self

  return (
    <button onClick={handleFollow} className="shad-button_primary">
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;