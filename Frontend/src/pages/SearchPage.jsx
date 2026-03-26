/* eslint-disable react-hooks/set-state-in-effect */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  SearchIcon,
  MessageSquareIcon,
} from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const SearchPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const isLoading = loadingFriends || loadingUsers;

  // Combine arrays for searching
  const allUsers = [...friends, ...recommendedUsers];

  // If search is empty, just show recommended users as per requirements
  const displayedUsers =
    searchTerm.trim() === ""
      ? recommendedUsers
      : allUsers.filter((user) => {
          const lowerTerm = searchTerm.toLowerCase();
          return (
            user.fullName?.toLowerCase().includes(lowerTerm) ||
            user.nativeLanguage?.toLowerCase().includes(lowerTerm) ||
            user.learningLanguage?.toLowerCase().includes(lowerTerm)
          );
        });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Search Framework
              </h2>
              <p className="opacity-70">
                Find your existing friends or discover perfect language exchange partners
              </p>
            </div>
          </div>

          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-base-content opacity-50" />
            </div>
            <input
              type="text"
              className="input w-full pl-10 bg-base-200/50 rounded-full border-none focus:bg-base-200 transition-colors shadow-sm"
              placeholder="Search users by name or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : displayedUsers.length === 0 ? (
          <div className="card bg-base-200 p-6 text-center max-w-xl mx-auto">
            <h3 className="font-semibold text-lg mb-2">No users found</h3>
            <p className="text-base-content opacity-70">
              Try adjusting your search query or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedUsers.map((user) => {
              const isFriend = friends.some((f) => f._id === user._id);
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="card border border-base-content/10 bg-transparent lg:bg-base-100 hover:bg-base-200/50 transition-colors shadow-none rounded-3xl"
                >
                  <div className="card-body p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar size-16 rounded-full">
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="rounded-full"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg truncate w-32">
                          {user.fullName}
                        </h3>
                        {user.location && (
                          <div className="flex items-center text-xs opacity-70 mt-1">
                            <MapPinIcon className="size-3 mr-1" />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="badge badge-secondary text-xs">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitialize(user.nativeLanguage)}
                      </span>
                      <span className="badge badge-outline text-xs">
                        {getLanguageFlag(user.learningLanguage)}
                        Learning: {capitialize(user.learningLanguage)}
                      </span>
                    </div>

                    {user.bio && (
                      <p className="text-sm opacity-70 line-clamp-2">
                        {user.bio}
                      </p>
                    )}

                    {isFriend ? (
                      <Link to={`/chat/${user._id}`} className="btn btn-outline rounded-full w-full mt-2">
                        <MessageSquareIcon className="size-4 mr-2" />
                        Message
                      </Link>
                    ) : (
                      <button
                        className={`btn rounded-full w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Add Friend
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
