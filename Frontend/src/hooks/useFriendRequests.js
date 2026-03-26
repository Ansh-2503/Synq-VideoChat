import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const useFriendRequests = () => {
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return {
    friendRequests,
    incomingRequests,
    acceptedRequests,
    isLoading,
  };
};

export default useFriendRequests;
