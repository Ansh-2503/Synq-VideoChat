import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "./ChatLoader";
import CallButton from "./CallButton";
import { XIcon, ArrowLeftIcon } from "lucide-react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatContainer = ({ targetUserId, onClose }) => {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    let client;
    const initChat = async () => {
      if (!tokenData?.token || !authUser || !targetUserId) return;

      try {
        console.log("Initializing stream chat client...");

        client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token,
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}`;
      channel.sendMessage({
        text: `I have started a video call. Join me here: ${callUrl}/call/${channel.id}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-full w-full flex-1">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full h-full relative flex flex-col">
            <div className="absolute top-3 right-4 flex items-center gap-2 z-20">
              <CallButton handleVideoCall={handleVideoCall} />
              {onClose && (
                <button
                  onClick={onClose}
                  className="btn btn-ghost btn-sm h-9 px-4 rounded-full bg-base-100/50 backdrop-blur-md border border-base-content/10 hover:bg-base-200 transition-all gap-2 shadow-sm hidden md:flex"
                  title="Close Chat"
                >
                  <XIcon className="size-4 opacity-70" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Close
                  </span>
                </button>
              )}
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="btn btn-ghost btn-circle absolute left-1 top-2.5 z-10 md:hidden bg-base-100/90 shadow-sm"
                title="Back"
              >
                <ArrowLeftIcon className="size-5" />
              </button>
            )}
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatContainer;
