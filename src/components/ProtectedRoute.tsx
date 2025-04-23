import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optional: You can render a loading spinner or skeleton screen here
    // while the initial session check is happening.
    // Returning null prevents rendering children prematurely.
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Use session check as Supabase might have a session before user object is fully populated initially
  if (!session) {
    // User not logged in, redirect them to the login page.
    // Pass the current location in state so we can redirect back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in, render the children components.
  return children;
};

export default ProtectedRoute; 