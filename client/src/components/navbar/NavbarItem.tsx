import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface NavbarItemProps {
  item: NavbarItemType;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  item,
  isMobile = false,
  onClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative", isMobile ? "w-full" : "inline-block")}
    >
      <Link
        to={item.href}
        onClick={onClick}
        className={cn(
          "block px-3 py-2 text-sm transition-colors",
          "hover:bg-gray-100 rounded-lg",
          isActive
            ? "text-teal-600 font-semibold"
            : "text-gray-600 hover:text-gray-900",
          isMobile ? "text-lg py-3" : ""
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"
            layoutId="underline"
          />
        )}
      </Link>
    </motion.div>
  );
};
