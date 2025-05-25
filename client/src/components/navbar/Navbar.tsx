import React, { useState, useEffect } from "react";
import { NavbarItem } from "./NavbarItem";
import { Link } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import MobileMenu from "./MobileMenu";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useAppSelector } from "../../hooks/redux";

interface iAppNavbarProps {
  items: NavbarItemType[];
  absolute?: boolean;
}

export const Navbar: React.FC<iAppNavbarProps> = ({ items, absolute }) => {
  const { authenticated } = useAppSelector((state) => state.auth);
  const { isAdmin } = useAdminAuth();
  const [stickyNav, setStickyNav] = useState(false);

  const filteredItems = items.filter((item) => {
    if (item.authRequired && !authenticated) return false;
    if (item.href.startsWith("/admin") && !isAdmin) return false;
    return true;
  });

  useEffect(() => {
    if (!absolute) return;

    const handleScroll = () => {
      const scrollThreshold = 100;

      if (window.scrollY > scrollThreshold) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [absolute]);

  let navbarClass = "";

  if (absolute) {
    if (stickyNav) {
      navbarClass = "fixed top-0 left-0 right-0 shadow-md";
    } else {
      navbarClass = "absolute top-0 left-0 right-0";
    }
  } else {
    navbarClass = "sticky top-0";
  }

  const slideDownStyle =
    stickyNav && absolute
      ? {
          animation: "slideInDown 0.3s forwards",
        }
      : {};

  return (
    <nav
      className={`${navbarClass} z-40 backdrop-blur-sm py-4 border-b border-gray-200 transition-all duration-300`}
      style={{
        backgroundColor: stickyNav ? "rgba(249, 250, 251, 0.9)" : "transparent",
        ...slideDownStyle,
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
            BidFlow
          </span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {filteredItems.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex">
            <AuthButtons />
          </div>
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileMenu items={filteredItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};
