import { NavbarItemType } from "../types/navbarTypes";

export const NAVBAR_ITEMS: NavbarItemType[] = [
  { id: "1", label: "Home", href: "/" },
  {
    id: "2",
    label: "Dashboard",
    href: "/dashboard",
    authRequired: true,
  },
  // {
  //   id: "3",
  //   label: "Bids",
  //   href: "/bids",
  //   authRequired: true,
  // },
  // {
  //   id: "4",
  //   label: "Contracts",
  //   href: "/contracts",
  //   authRequired: true,
  // },
];
