import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { supabase } from '../../utils/supabaseClient';
import OAuthButton from '../../components/Auth/OAuthButton'; // Import the button
import { Provider } from '@supabase/supabase-js'; // Import Provider type

// Placeholder Icons (replace with actual icons, e.g., from react-icons)
const GoogleIcon = () => <span>G</span>;
const GitHubIcon = () => <span>GH</span>;
const AppleIcon = () => <span></span>;
const TwitterIcon = () => <span>X</span>;
// const ForemIcon = () => <span>F</span>; // If needed
// const FacebookIcon = () => <span>FB</span>; // If needed

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false); // Separate loading state for OAuth
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for redirection

  // Handler for OAuth sign-in
  const handleOAuthSignIn = async (provider: Provider) => {
    setError(null);
    setOauthLoading(true);
    try {
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
            provider: provider,
            // options: {
            //     redirectTo: window.location.origin + '/welcome', // Optional redirect after successful OAuth
            // }
        });

        if (oauthError) {
            setError(`Error signing in with ${provider}: ${oauthError.message}`);
            console.error(`OAuth Error (${provider}):`, oauthError.message);
            setOauthLoading(false); // Stop loading only if error occurs immediately
            return;
        }
        // Note: Supabase redirects to the provider. If successful, the user is redirected back.
        // The loading state might not need to be manually reset here unless there's an immediate error.
    } catch (err) {
        console.error("Unexpected OAuth error:", err);
        setError("An unexpected error occurred during OAuth sign in.");
        setOauthLoading(false);
    }
    // setLoading(false); // Loading likely continues until redirect
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setOauthLoading(false); // Ensure OAuth loading is false

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        // Provide user-friendly error messages
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (signInError.message.includes("Email not confirmed")) {
            setError("Please check your email to confirm your account before signing in.");
        } else {
          setError("An error occurred during sign in. Please try again.");
        }
        console.error("Sign in error:", signInError.message);
        setLoading(false); // Stop loading on error
        return; // Stop execution after error
      }

      // Successful sign-in
      // Redirect to a protected page, e.g., home or dashboard
      // The actual session update should ideally be handled by a global listener (onAuthStateChange)
      navigate('/home'); // Example redirect

    } catch (err) {
      console.error("Unexpected error during sign in:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      // setLoading(false); // Reset loading only if navigation doesn't happen or fails
      // Since navigate() happens on success, we might let the unmount handle cleanup
      // Or only set loading false in error cases above.
      if (error) setLoading(false); // Only reset if there was an error during the process
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* OAuth Buttons Area */}
        <div className="space-y-2">
             <OAuthButton
                providerName="Google"
                icon={<GoogleIcon />}
                onClick={() => handleOAuthSignIn('google')}
                disabled={loading || oauthLoading}
            />
            <OAuthButton
                providerName="GitHub"
                icon={<GitHubIcon />}
                onClick={() => handleOAuthSignIn('github')}
                disabled={loading || oauthLoading}
            />
             <OAuthButton
                providerName="Apple"
                icon={<AppleIcon />}
                onClick={() => handleOAuthSignIn('apple')}
                disabled={loading || oauthLoading}
            />
             <OAuthButton
                providerName="Twitter (X)"
                icon={<TwitterIcon />}
                onClick={() => handleOAuthSignIn('twitter')}
                disabled={loading || oauthLoading}
            />
            {/* Add other providers like Forem, Facebook if needed */}
        </div>

        {/* Divider */}
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
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
              disabled={loading || oauthLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                {/* Placeholder for Forgot Password link */}
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password" // Use current-password for sign in
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || oauthLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
            />
          </div>

          {/* Optional: Remember me checkbox - Supabase handles session persistence by default */}
          {/*
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
          </div>
          */}

          <div>
            <button
              type="submit"
              disabled={loading || oauthLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                (loading || oauthLoading) ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>

        {/* Placeholder for Terms/Policy links */}
        <p className="mt-4 text-xs text-center text-gray-500">
          By signing in, you are agreeing to our <a href="/privacy" className="underline">privacy policy</a>, <a href="/terms" className="underline">terms of use</a> and <a href="/code-of-conduct" className="underline">code of conduct</a>.
        </p>
      </div>
    </div>
  );
} 