import React from "react";
import { Link, useLocation } from "react-router";
import { HomeIcon, SearchIcon, UserIcon, BellIcon } from "lucide-react";
import useFriendRequests from "../hooks/useFriendRequests";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { incomingRequests } = useFriendRequests();

  const getButtonClass = (path) => {
    return `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
      currentPath === path ? "text-primary" : "text-base-content/60 hover:text-base-content"
    }`;
  };

  return (
    <div className="w-full h-[60px] bg-base-100 border-t border-base-content/10 lg:hidden flex z-40 px-2 shrink-0">
      <Link to="/" className={getButtonClass("/")}>
        <HomeIcon className={`size-6 ${currentPath === "/" ? "fill-primary/20 bg-primary/10 rounded-full p-0.5" : ""}`} />
        <span className="text-[10px] sm:text-xs font-medium">Home</span>
      </Link>
      
      <Link to="/search" className={getButtonClass("/search")}>
        <SearchIcon className={`size-6 ${currentPath === "/search" ? "bg-primary/10 rounded-full p-0.5 text-primary" : ""}`} />
        <span className="text-[10px] sm:text-xs font-medium">Search</span>
      </Link>

      <Link to="/friends" className={getButtonClass("/friends")}>
        <UserIcon className={`size-6 ${currentPath === "/friends" ? "fill-primary/20 bg-primary/10 rounded-full p-0.5" : ""}`} />
        <span className="text-[10px] sm:text-xs font-medium">Friends</span>
      </Link>

      <Link to="/notifications" className={getButtonClass("/notifications")}>
        <div className="indicator">
          {incomingRequests.length > 0 && (
            <span className="indicator-item badge badge-primary badge-xs rounded-full p-1 border-base-100 scale-75 right-1">
              {incomingRequests.length}
            </span>
          )}
          <BellIcon className={`size-6 ${currentPath === "/notifications" ? "fill-primary/20 bg-primary/10 rounded-full p-0.5" : ""}`} />
        </div>
        <span className="text-[10px] sm:text-xs font-medium">Alerts</span>
      </Link>
    </div>
  );
};

export default BottomNav;
