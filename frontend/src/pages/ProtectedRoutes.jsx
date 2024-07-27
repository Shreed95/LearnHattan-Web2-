import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ element, ...props }) => {
  const { user } = useAuthContext();

  return user ? <Route {...props} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
