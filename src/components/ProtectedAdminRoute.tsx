import { useState, useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../utils/adminAuth';
import { supabase } from '../utils/supabaseClient';

type ProtectedAdminRouteProps = {
  children: ReactNode;
};

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // First check if we have a session at all
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('No active session found, redirecting to login');
          setIsAuthorized(false);
          setError('Please login to access admin features');
          setIsLoading(false);
          return;
        }
        
        console.log('Session found for user:', session.user.email);
        
        // Check if the user is an admin
        const adminStatus = await isAdmin();
        console.log('Admin check result:', adminStatus);
        
        setIsAuthorized(adminStatus);
        
        if (!adminStatus) {
          setError('You do not have admin privileges');
        }
      } catch (err: any) {
        console.error('Error in ProtectedAdminRoute:', err);
        setError(err.message || 'An error occurred verifying admin access');
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 mx-auto text-[#D97904]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    // Show error message before redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1>
          <p className="mb-6">{error || 'You do not have permission to access this page'}</p>
          <button
            onClick={() => window.location.href = '/admin/login'}
            className="w-full bg-[#D97904] text-white py-2 px-4 rounded hover:bg-opacity-90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 