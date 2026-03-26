import React from "react";
import { useParams } from "react-router";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatContainer targetUserId={targetUserId} />
    </div>
  );
};

export default ChatPage;
