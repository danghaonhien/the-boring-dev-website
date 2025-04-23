import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Already imported below
import { supabase } from '../../utils/supabaseClient'; // Adjusted path
import OAuthButton from '../../components/Auth/OAuthButton'; // Import the button
import { Provider } from '@supabase/supabase-js'; // Import Provider type
import { Link } from 'react-router-dom'; // Import Link

// Placeholder Icons (replace with actual icons, e.g., from react-icons)
// You can share these or define them again
const GoogleIcon = () => <span>G</span>;
const GitHubIcon = () => <span>GH</span>;
const AppleIcon = () => <span></span>;
const TwitterIcon = () => <span>X</span>;


export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false); // Separate loading state for OAuth
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handler for OAuth sign-in (can be used for sign-up too)
  const handleOAuthSignIn = async (provider: Provider) => {
    setError(null);
    setSuccessMessage(null); // Clear success message if trying OAuth
    setOauthLoading(true);
    try {
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
            provider: provider,
            // options: {
            //     redirectTo: window.location.origin + '/welcome', // Optional redirect after successful OAuth
            // }
        });

        if (oauthError) {
            // Use template literal correctly
            setError(`Error signing up with ${provider}: ${oauthError.message}`);
            console.error(`OAuth Error (${provider}):`, oauthError.message);
            setOauthLoading(false);
            return;
        }
        // Redirect happens via Supabase
    } catch (err) {
        console.error("Unexpected OAuth error:", err);
        setError("An unexpected error occurred during OAuth sign up.");
        setOauthLoading(false);
    }
  };


  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setOauthLoading(false); // Ensure OAuth loading is false

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
            setError("This email address is already registered. Try signing in or use a different email.");
        } else if (signUpError.message.includes("Password should be")) {
             setError(signUpError.message);
        } else {
            setError("An error occurred during sign up. Please try again.");
        }
        console.error("Sign up error:", signUpError.message);
        setLoading(false); // Stop loading on error
        return;
      }

      if (data.user && data.user.identities && data.user.identities.length === 0) {
          setSuccessMessage("Sign up successful! Please check your email to verify your account.");
          // Optionally clear form
          // setEmail(''); setPassword(''); setConfirmPassword('');
      } else if (data.session) {
          setSuccessMessage("Sign up successful! You are now logged in.");
           // Potentially redirect here if needed, though onAuthStateChange is better
      } else {
          setSuccessMessage("Sign up successful! Please check your email for next steps.");
      }

    } catch (err) {
      console.error("Unexpected error during sign up:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      // Only stop loading if there wasn't a success message (meaning an error likely occurred)
      // or if the process finished without a session (e.g., email verification needed)
      // if (!successMessage) {
      //   setLoading(false);
      // }
      // If there's a success message, keep loading indicator maybe? Or hide form.
      // Current logic hides form on successMessage, so resetting loading is fine.
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm text-center mb-4">{successMessage}</p>}

        {!successMessage && ( // Hide forms after successful sign up message
        <>
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
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <input
                    id="email" name="email" type="email" autoComplete="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || oauthLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
                />
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password" name="password" type="password" autoComplete="new-password" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || oauthLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
                    aria-describedby="password-help"
                />
                <p id="password-help" className="mt-1 text-xs text-gray-500">Must be at least 8 characters long.</p>
                </div>

                <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading || oauthLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
                />
                </div>

                <div>
                <button
                    type="submit"
                    disabled={loading || oauthLoading}
                    // Corrected template literal for className
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    (loading || oauthLoading) ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
                </div>
            </form>
        </>
        )} {/* End of !successMessage block */}

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          {/* Correctly use Link component */}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
} 