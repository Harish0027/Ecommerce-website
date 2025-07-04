import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loader/Loading";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.currentLoggedUser);

  if (loading) return <Loading/>; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
