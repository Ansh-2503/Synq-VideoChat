import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import useFriendRequests from "../hooks/useFriendRequests";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const { incomingRequests } = useFriendRequests();

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-100/90 backdrop-blur-md border-b-[0.5px] border-base-content/10 sticky top-0 z-30 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Global Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/Synq_logo.png"
              alt="Synq Logo"
              className="size-[80px] object-contain"
            />
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-2xl font-black font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-none tracking-tight">
                Synq
              </span>
              <span className="text-[10px] font-semibold text-base-content/40 tracking-[0.2em] mt-1 whitespace-nowrap leading-none pl-0.5">
                VIDEO CHAT
              </span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  {incomingRequests.length > 0 && (
                    <span className="indicator-item badge badge-success badge-sm border-base-200">
                      {incomingRequests.length}
                    </span>
                  )}
                  <BellIcon className="h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-70" />
                </div>
              </button>
            </Link>

            <ThemeSelector />

            {/* User Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ml-1 sm:ml-2"
              >
                <div className="w-9 rounded-full overflow-hidden shadow-sm border border-base-content/10">
                  <img
                    src={authUser?.profilePic}
                    alt="User Avatar"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 border border-base-content/10 rounded-xl w-44 gap-1"
              >
                <li>
                  <Link
                    to="/onboarding"
                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium hover:bg-base-200 transition-colors"
                  >
                    <UserIcon className="h-4 w-4 text-primary" />
                    <span>Update Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutMutation}
                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium text-error hover:bg-error/10 hover:text-error transition-colors mt-0.5"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
