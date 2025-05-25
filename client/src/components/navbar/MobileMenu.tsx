import React from "react";
import { NavbarItem } from "./NavbarItem";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import { motion } from "framer-motion";
import { X, User, Menu, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "../ui/drawer";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  items: NavbarItemType[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const displayName =
    currentUser?.username || currentUser?.phoneNumber || "Guest";
  const displayEmail = currentUser?.email;
  const isGuest = !authenticated;

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className="text-gray-700 p-2 rounded-lg hover:bg-gray-200/70 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent className="fixed inset-y-0 right-0 h-full w-72 max-h-screen bg-white border-l border-gray-200 shadow-lg z-50">
            <div className="h-full flex flex-col max-h-screen">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                    BidFlow
                  </span>
                </div>
                <DrawerClose className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                  <X size={20} />
                </DrawerClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                  className={`mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm ${
                    isGuest ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <div
                        className={`absolute -inset-1 ${
                          isGuest ? "bg-gray-200" : "bg-teal-500"
                        } rounded-full blur-sm`}
                      ></div>
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 ${
                          isGuest ? "bg-gray-200" : "bg-teal-500"
                        } rounded-full`}
                      >
                        <User
                          size={20}
                          className={
                            isGuest ? "text-gray-500" : "text-blue-600"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-gray-800">
                        {displayName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {isGuest ? "Not logged in" : "Logged in"}
                      </span>
                    </div>
                  </div>

                  {/* Only show email section if email exists */}
                  {displayEmail && (
                    <div className="bg-white p-2 rounded-md">
                      <span className="text-sm text-gray-500">Email</span>
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {displayEmail}
                      </div>
                    </div>
                  )}
                </motion.div>

                {currentUser?.role === "ADMIN" && (
                  <Link to="/admin-dashboard" className="block mt-3 mb-1">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-gradient-to-r from-teal-50 to-blue-50 border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer">
                      <ShieldCheck
                        size={16}
                        strokeWidth={2}
                        className="text-teal-600"
                      />
                      <span className="text-sm font-medium bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                        Admin Dashboard
                      </span>
                    </div>
                  </Link>
                )}

                <div className="h-px w-full bg-gradient-to-r from-teal-200 via-blue-200 to-teal-200 my-6"></div>

                <nav className="space-y-1 pb-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial="closed"
                      animate="open"
                      variants={itemVariants}
                      custom={index}
                    >
                      <DrawerClose asChild>
                        <div className="py-1 px-2 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                          <NavbarItem item={item} isMobile />
                        </div>
                      </DrawerClose>
                    </motion.div>
                  ))}
                </nav>

                <div className="border-t border-gray-200 bg-white p-4">
                  <motion.div
                    initial="closed"
                    animate="open"
                    variants={itemVariants}
                  >
                    <AuthButtons isMobile />
                  </motion.div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
