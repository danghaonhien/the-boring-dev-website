import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  // Show loading during authentication check
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if there's no session
  if (!session) {
    console.log("No session found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the children components
  return children;
};

export default ProtectedRoute; 