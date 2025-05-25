import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  notFoundRoute,
  protectedRoutes,
  authRoutes,
} from "./routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { Loader } from "../components/general/Loader";
import { MainLayout } from "../layouts/mainLayout";
import Home from "../pages/Home";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />

          {authRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={React.createElement(element)}
            />
          ))}

          <Route element={<ProtectedRoute />}>
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={React.createElement(element)}
              />
            ))}
          </Route>

          <Route
            path={notFoundRoute.path}
            element={React.createElement(notFoundRoute.element)}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};
