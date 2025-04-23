import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient'; // Adjust path as needed

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handlePasswordResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    // IMPORTANT: Define the URL for your update password page
    // This MUST be added to your Supabase project's "Redirect URLs" list under Authentication -> URL Configuration
    const redirectTo = `${window.location.origin}/update-password`;

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo,
      });

      if (resetError) {
        setError("Error sending password reset email. Please check the email address and try again.");
        console.error("Password reset error:", resetError.message);
      } else {
        setMessage("Password reset email sent. Please check your inbox (and spam folder) for instructions.");
        // Optionally clear the email field
        // setEmail('');
      }
    } catch (err) {
      console.error("Unexpected error during password reset request:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-sm text-center text-gray-600">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center">{message}</p>}

        {!message && ( // Hide form after sending the email
          <form onSubmit={handlePasswordResetRequest} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}

        <p className="text-sm text-center text-gray-600">
          Remembered your password?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
} 