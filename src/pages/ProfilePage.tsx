import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed

// Define a type for the profile data
interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the editable form fields
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false); // To toggle edit form
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      console.log("[ProfilePage] Attempting to fetch profile for user:", user);
      if (!user) {
        console.error("[ProfilePage] No user object available.");
        setError("User not found."); 
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log(`[ProfilePage] Fetching profile for user ID: ${user.id}`);
        const { data, error: fetchError, status } = await supabase
          .from('profiles')
          .select(`username, full_name, avatar_url, updated_at`)
          .eq('id', user.id)
          .single(); 

        console.log("[ProfilePage] Fetch result:", { data, fetchError, status });

        if (fetchError && status !== 406) {
          console.error("[ProfilePage] Supabase fetch error (status != 406):", fetchError);
          throw fetchError;
        }

        if (isMounted) {
          if (data) {
            console.log("[ProfilePage] Profile data found:", data);
            setProfile(data);
            setUsername(data.username || '');
            setFullName(data.full_name || '');
          } else {
            console.warn("[ProfilePage] No profile data returned for user.");
            setProfile({ username: null, full_name: null, avatar_url: null, updated_at: null });
            setUsername('');
            setFullName('');
          }
        }
      } catch (err: any) {
        console.error("[ProfilePage] Caught error during fetchProfile:", err.message);
        if (isMounted) {
          setError("Could not fetch profile data.");
        }
      } finally {
        console.log("[ProfilePage] Setting loading to false.");
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      console.log("[ProfilePage] Unmounting component.");
      isMounted = false;
    };
  }, [user]);

  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    if (!user) {
        setUpdateError("Cannot update profile: User not found.");
        setUpdateLoading(false);
        return;
    }

    // Basic validation (add more as needed)
    if (!username.trim()) {
        setUpdateError("Username cannot be empty.");
        setUpdateLoading(false);
        return;
    }

    try {
      const updates = {
        id: user.id, // RLS policy uses this to identify the row
        username: username.trim(),
        full_name: fullName.trim(),
        // updated_at will be set by the trigger
      };

      const { error: updateError } = await supabase.from('profiles').upsert(updates);
        // Using upsert is convenient, RLS prevents inserting new rows
        // or updating rows not owned by the user.

      if (updateError) {
         if (updateError.message.includes('duplicate key value violates unique constraint "profiles_username_key"')) {
            setUpdateError('Username is already taken. Please choose another.');
        } else {
            setUpdateError('Failed to update profile. Please try again.');
        }
        console.error("Profile update error:", updateError.message);
        throw updateError; 
      }

      // Success: Update local state immediately and show message
      setProfile(prev => prev ? { ...prev, username: updates.username, full_name: updates.full_name } : null);
      setUpdateSuccess("Profile updated successfully!");
      setIsEditing(false); // Close edit form on success

    } catch (err: any) {
      console.error("Error updating profile:", err.message);
      // Error state is already set if it was a Supabase error
      if (!updateError) { // Catch unexpected errors
           setUpdateError('An unexpected error occurred.');
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!profile) {
      // This state might occur briefly or if there's an issue creating the profile row
      return <div className="p-6">Profile not found or initializing...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      {/* Display Section */}
      {!isEditing && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <p className="mb-2"><strong className="font-medium">Email:</strong> {user?.email}</p>
          <p className="mb-2"><strong className="font-medium">Username:</strong> {profile.username || 'Not set'}</p>
          <p className="mb-2"><strong className="font-medium">Full Name:</strong> {profile.full_name || 'Not set'}</p>
          <p className="mb-2"><strong className="font-medium">Avatar URL:</strong> {profile.avatar_url || 'Not set'}</p>
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt="User Avatar" className="w-20 h-20 rounded-full my-2" />
          )}
          <p className="text-sm text-gray-500 mt-2">
              Last Updated: {profile.updated_at ? new Date(profile.updated_at).toLocaleString() : 'N/A'}
          </p>
          <button 
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Editing Form Section */}
      {isEditing && (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            {updateError && <p className="text-red-500 text-sm mb-4">{updateError}</p>}
            {updateSuccess && <p className="text-green-600 text-sm mb-4">{updateSuccess}</p>}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input 
                        id="username" type="text" value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        disabled={updateLoading}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
                    />
                </div>
                 <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                        id="fullName" type="text" value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        disabled={updateLoading}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
                    />
                </div>
                {/* Add Avatar URL input later if needed */}
                <div className="flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={() => {
                            setIsEditing(false);
                            // Reset form fields to original values if desired
                            setUsername(profile.username || '');
                            setFullName(profile.full_name || '');
                            setUpdateError(null); // Clear errors on cancel
                            setUpdateSuccess(null);
                        }}
                        disabled={updateLoading}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm disabled:opacity-50"
                    >
                        Cancel
                    </button>
                     <button 
                        type="submit" 
                        disabled={updateLoading}
                        className={`px-4 py-2 text-white rounded text-sm disabled:opacity-50 ${
                            updateLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {updateLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
} 