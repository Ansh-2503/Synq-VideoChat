import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, SearchIcon, UserIcon } from "lucide-react";
import useFriendRequests from "../hooks/useFriendRequests";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const { incomingRequests } = useFriendRequests();

  return (
    <aside className="w-20 hover:w-64 bg-base-100 border-r-[0.5px] border-base-content/10 hidden lg:flex flex-col h-full absolute left-0 top-0 transition-all duration-300 ease-in-out group z-50 overflow-hidden peer">
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-2xl hover:bg-primary/10 hover:text-primary ${
            currentPath === "/" ? "bg-base-200" : ""
          }`}
        >
          <HomeIcon className={`size-5 shrink-0 ${currentPath === "/" ? "text-primary" : "text-base-content/70"}`} />
          <span className="hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Home</span>
        </Link>
        <Link
          to="/search"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-2xl hover:bg-primary/10 hover:text-primary ${
            currentPath === "/search" ? "bg-base-200" : ""
          }`}
        >
          <SearchIcon className={`size-5 shrink-0 ${currentPath === "/search" ? "text-primary" : "text-base-content/70"}`} />
          <span className="hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Search Friends</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-2xl hover:bg-primary/10 hover:text-primary ${
            currentPath === "/friends" ? "bg-base-200" : ""
          }`}
        >
          <UserIcon className={`size-5 shrink-0 ${currentPath === "/friends" ? "text-primary" : "text-base-content/70"}`} />
          <span className="hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-2xl hover:bg-primary/10 hover:text-primary ${
            currentPath === "/notifications" ? "bg-base-200" : ""
          }`}
        >
          <div className="indicator">
            {incomingRequests.length > 0 && (
              <span className="indicator-item badge badge-success badge-sm border-base-200 top-1 right-[-4px]">
                {incomingRequests.length}
              </span>
            )}
            <BellIcon className={`size-5 shrink-0 ${currentPath === "/notifications" ? "text-primary" : "text-base-content/70"}`} />
          </div>
          <span className="hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Notifications</span>
        </Link>
      </nav>

      {/* UserProfile Section */}
      <div className="p-4 border-t-[0.5px] border-base-content/10 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full shrink-0">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1 hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 overflow-hidden">
            <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block shrink-0" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
