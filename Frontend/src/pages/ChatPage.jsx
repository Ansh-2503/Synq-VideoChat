import { useParams } from "react-router";
import useStreamClient from "../hooks/useStreamClient";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const chatClient = useStreamClient();

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatContainer chatClient={chatClient} targetUserId={targetUserId} />
    </div>
  );
};

export default ChatPage;
