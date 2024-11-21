import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('user_id');
  const accessToken = localStorage.getItem('access_token');

  // Check if user_id and access_token exist
  if (!userId || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
