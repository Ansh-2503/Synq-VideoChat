import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import toast from "react-hot-toast";
import ChatLoader from "./ChatLoader";
import CallButton from "./CallButton";
import { XIcon } from "lucide-react";

const ChatContainer = ({ chatClient, targetUserId, onClose }) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  useEffect(() => {
    if (!chatClient || !authUser || !targetUserId) return;

    let active = true;

    const initChannel = async () => {
      try {
        setLoading(true);

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = chatClient.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        if (active) {
          setChannel(currChannel);
        }
      } catch (error) {
        console.error("Error initializing channel:", error);
        toast.error("Could not open chat. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    initChannel();

    return () => {
      active = false;
    };
  }, [chatClient, authUser, targetUserId]);

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
