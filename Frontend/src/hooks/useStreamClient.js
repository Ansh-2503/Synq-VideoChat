import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

/**
 * Returns the connected Stream Chat client singleton.
 * If the user is already connected (e.g. from HomePage), the existing
 * instance is returned immediately without calling connectUser again.
 */
const useStreamClient = () => {
  const { authUser } = useAuthUser();
  const [chatClient, setChatClient] = useState(null);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser) return;

    const client = StreamChat.getInstance(STREAM_API_KEY);

    // If already connected (singleton reuse), just set it immediately
    if (client.userID) {
      setChatClient(client);
      return;
    }

    // Otherwise connect the user
    client
      .connectUser(
        {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
        tokenData.token
      )
      .then(() => {
        console.log("Stream client initialized and user connected");
        setChatClient(client);
      })
      .catch((err) => console.error("Error connecting Stream user:", err));
  }, [tokenData, authUser]);

  return chatClient;
};

export default useStreamClient;
