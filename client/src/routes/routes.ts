import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const AdminDashboard = lazy(() => import("../pages/BidsDashboard"));
const Bids = lazy(() => import("../pages/Bids"));
const Contracts = lazy(() => import("../pages/BidsContracts"));

const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

interface RouteConfig {
  path: string;
  element: React.ComponentType;
  fullWidth?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  { path: "/", element: Home, fullWidth: true },
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [
  { path: "/dashboard", element: AdminDashboard },
  { path: "/bids", element: Bids },
  { path: "/contracts", element:  Contracts},
];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
