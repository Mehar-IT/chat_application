import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  children,
  redirect = "/",
}) {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
}
