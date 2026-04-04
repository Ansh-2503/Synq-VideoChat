import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import useStreamClient from "../hooks/useStreamClient";
import { SearchIcon, MessageSquareIcon } from "lucide-react";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { authUser } = useAuthUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const chatClient = useStreamClient();

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const filteredFriends =
    searchTerm.trim() === ""
      ? friends
      : friends.filter((friend) =>
          friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Left Sidebar - Friend List */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r border-base-300 flex flex-col bg-base-100 shrink-0 transition-none ${
          selectedChatUser ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b border-base-300">
          <h2 className="text-xl font-bold truncate">
            {authUser?.fullName || "Messages"}
          </h2>
        </div>

        <div className="p-4 py-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-50" />
            <input
              type="text"
              placeholder="Search friends..."
              className="input input-sm input-bordered w-full pl-9 rounded-full bg-base-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full p-2 space-y-1">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : filteredFriends.length === 0 ? (
            <div className="text-center opacity-50 py-8">
              {searchTerm ? "No user found" : "No friends found"}
            </div>
          ) : (
            filteredFriends.map((friend) => (
              <button
                key={friend._id}
                onClick={() => setSelectedChatUser(friend)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors ${
                  selectedChatUser?._id === friend._id ? "bg-base-200" : ""
                }`}
              >
                <div className="avatar size-12 shrink-0">
                  <img
                    src={friend.profilePic}
                    alt={friend.fullName}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="font-semibold truncate">
                    {friend.fullName}
                  </span>
                  <span className="text-xs opacity-70 truncate">
                    Tap to message
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Main Area - Active Chat */}
      <div
        className={`flex-1 bg-base-100 flex flex-col ${
          selectedChatUser ? "flex" : "hidden md:flex"
        }`}
      >
        {selectedChatUser ? (
          <ChatContainer
            chatClient={chatClient}
            targetUserId={selectedChatUser._id}
            onClose={() => setSelectedChatUser(null)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50 h-[calc(100vh-4rem)]">
            <MessageSquareIcon className="size-16 mb-4" />
            <p className="text-xl font-medium tracking-tight">Your Messages</p>
            <p className="text-sm mt-1">Select a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
