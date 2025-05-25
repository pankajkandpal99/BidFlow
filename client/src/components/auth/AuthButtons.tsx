import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import { logoutUser } from "../../features/auth/auth.slice";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false }) => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector((state: RootState) => state.auth);
  const { currentUser } = useAppSelector((state: RootState) => state.user);

  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const userInitial =
    currentUser?.username?.charAt(0) ||
    currentUser?.email?.charAt(0) ||
    currentUser?.phoneNumber?.charAt(0) ||
    "G";

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 w-full mb-6">
        {authenticated ? (
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 focus:text-red-500 focus:bg-red-50 border-gray-200"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        ) : (
          <Link to="/login" className="w-full">
            <Button className="w-full gap-2 bg-teal-500 text-white hover:bg-teal-700">
              <LogIn size={16} />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {authenticated && currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto p-0 hover:bg-gray-100 flex flex-row gap-x-1"
            >
              <Avatar>
                <AvatarImage
                  src={currentUser.avatar || defaultAvatar}
                  alt={currentUser.username || "User"}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {userInitial.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="ml-2 opacity-60 text-gray-600"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mt-2" align="end">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {currentUser.username || currentUser.phoneNumber}
              </span>
              {currentUser.email && (
                <span className="text-xs text-gray-500 truncate">
                  {currentUser.email}
                </span>
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* {currentUser.role === "ADMIN" && (
              <>
                <Link to="/admin-dashboard">
                  <DropdownMenuItem className="cursor-pointer text-blue-600 focus:text-blue-700 focus:bg-blue-50">
                    <ShieldCheck size={16} className="mr-2 opacity-60" />
                    Admin Dashboard
                  </DropdownMenuItem>
                </Link>
                <Link to="/admin/users">
                  <DropdownMenuItem className="cursor-pointer text-blue-600 focus:text-blue-700 focus:bg-blue-50">
                    <ShieldCheck size={16} className="mr-2 opacity-60" />
                    Manage Users
                  </DropdownMenuItem>
                </Link>
                <Link to="/admin/logs">
                  <DropdownMenuItem className="cursor-pointer text-blue-600 focus:text-blue-700 focus:bg-blue-50">
                    <ShieldCheck size={16} className="mr-2 opacity-60" />
                    System Logs
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
              </>
            )} */}

            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut size={16} strokeWidth={2} className="mr-2 opacity-60" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200" />
            <div className="relative bg-teal-500 text-white px-6 py-2 rounded-full font-semibold group-hover:bg-teal-600 transition-all cursor-pointer">
              Sign in
            </div>
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
