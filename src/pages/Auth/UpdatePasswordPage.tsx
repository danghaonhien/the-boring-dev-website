import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient'; // Adjust path as needed
import { useAuth } from '../../context/AuthContext'; // Use auth context to check if user is already fully logged in

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { session } = useAuth(); // Get session from context

  // Redirect if user is already fully authenticated (not via recovery link)
  useEffect(() => {
    // Check if the session exists and doesn't have the 'recovery' AMR
    // Supabase session object structure might vary, consult docs if needed
    // A simpler check might just be if(session) and let Supabase handle recovery flow,
    // but this adds a layer to prevent logged-in users hitting this page unnecessarily.
    if (session && !session.user?.aud?.includes('recovery')) { // Example check
        console.log("User already logged in, redirecting from update password page.");
        navigate('/home'); // Redirect logged-in users away
    }
    // Also handle Supabase firing PASSWORD_RECOVERY event via onAuthStateChange in AuthContext
    // This component primarily handles the form submission after the recovery session is active.
  }, [session, navigate]);


  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Add password strength check if desired
    if (newPassword.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }

    setLoading(true);

    try {
      // The user should be in a recovery session handled by onAuthStateChange
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
         // Handle specific errors if needed
        if (updateError.message.includes("same as the old password")) {
             setError("New password cannot be the same as the old password.");
        } else if (updateError.message.includes("Password should be stronger")) {
             setError("Password is too weak. Please choose a stronger password.");
        }
        else {
            setError("Error updating password. The link might have expired or been used already.");
        }
        console.error("Password update error:", updateError.message);
      } else {
        setMessage("Password updated successfully! You can now sign in with your new password.");
        // Optionally redirect to login after a delay
        setTimeout(() => {
            navigate('/login');
        }, 3000); // Redirect after 3 seconds
      }
    } catch (err) {
      console.error("Unexpected error during password update:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // The page content assumes the user has arrived via the recovery link
  // and Supabase has handled the session via onAuthStateChange
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Update Password</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center">{message}</p>}

        {!message && ( // Hide form after successful update
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-describedby="password-help"
              />
              <p id="password-help" className="mt-1 text-xs text-gray-500">Must be at least 8 characters long.</p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 