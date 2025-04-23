import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import Header from '../components/Header'; // Import the Header

// Placeholder Icons (replace with actual icons, e.g., from react-icons)
const CalendarIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>;
const GitHubIcon = () => <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>;
const PostIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>; // Example icon
const CommentIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.192-3.377A6.984 6.984 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>; // Example icon
const TagIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a1 1 0 011-1h5a.997.997 0 01.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>; // Example icon

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
  // We might add more fields later if needed (e.g., bio, joined_date from auth)
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  // --- Fetch Profile Logic (keep as is) ---
  useEffect(() => {
    let isMounted = true;
    async function fetchProfile() {
        if (!user) {
            setError("User not found.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError, status } = await supabase
                .from('profiles')
                .select(`username, full_name, avatar_url, updated_at`)
                .eq('id', user.id)
                .single();

            if (fetchError && status !== 406) throw fetchError;

            if (isMounted) {
                if (data) {
                    setProfile(data);
                    setUsername(data.username || '');
                    setFullName(data.full_name || '');
                } else {
                    setProfile({ username: null, full_name: null, avatar_url: null, updated_at: null });
                    setUsername('');
                    setFullName('');
                }
            }
        } catch (err: any) {
            console.error("Error fetching profile:", err.message);
            if (isMounted) setError("Could not fetch profile data.");
        } finally {
            if (isMounted) setLoading(false);
        }
    }
    fetchProfile();
    return () => { isMounted = false; };
}, [user]);

  // --- Update Profile Logic (keep as is) ---
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
    if (!username.trim()) {
        setUpdateError("Username cannot be empty.");
        setUpdateLoading(false);
        return;
    }
    try {
      const updates = {
        id: user.id,
        username: username.trim(),
        full_name: fullName.trim(),
      };
      const { error: updateError } = await supabase.from('profiles').upsert(updates);
      if (updateError) {
         if (updateError.message.includes('duplicate key value violates unique constraint "profiles_username_key"')) {
            setUpdateError('Username is already taken. Please choose another.');
        } else {
            setUpdateError('Failed to update profile. Please try again.');
        }
        console.error("Profile update error:", updateError.message);
        throw updateError; 
      }
      setProfile(prev => prev ? { ...prev, username: updates.username, full_name: updates.full_name } : null);
      setUpdateSuccess("Profile updated successfully!");
      setIsEditing(false); 
    } catch (err: any) {
      console.error("Error updating profile:", err.message);
      if (!updateError) {
           setUpdateError('An unexpected error occurred.');
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  // --- Render Logic --- 
  if (loading) {
    // Improved loading state centered on screen
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div>Loading profile...</div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
             <div className="p-6 text-red-500">Error: {error}</div>
        </div>
    );
  }

  if (!profile) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6">Profile not found or initializing...</div>
          </div>
      );
  }

  // Get joined date from user object (might need formatting)
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

  return (
    <div className="min-h-screen mx-auto px-12 py-6 bg-gray-100">
      <Header /> {/* Include the main site header */} 
      
      {/* Profile Content Area */}
      <main className=" mx-auto  py-8">
        {/* Top Banner Placeholder (optional) - Adjust height and background as needed */} 
        <div className="h-32 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-t-lg mb-[-60px]"></div>
        
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* --- Left Sidebar --- */} 
          <aside className="w-full md:w-1/4 flex-shrink-0 mb-8 md:mb-0">
            {/* Badges Section */} 
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="font-semibold mb-3 text-gray-800">Badges</h2>
              <div className="grid grid-cols-4 gap-2">
                {/* Placeholder Badges - Replace with actual data/component */} 
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold">B1</div>
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 font-bold">B2</div>
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">B3</div>
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold">B4</div>
              </div>
            </div>

            {/* Stats Section */} 
            <div className="bg-white p-4 rounded-lg shadow">
              {/* Placeholder Stats - Replace with actual data */} 
              <p className="text-sm text-gray-600 mb-2 flex items-center"><PostIcon /> 0 posts published</p>
              <p className="text-sm text-gray-600 mb-2 flex items-center"><CommentIcon /> 0 comments written</p>
              <p className="text-sm text-gray-600 flex items-center"><TagIcon /> 0 tags followed</p>
            </div>
          </aside>

          {/* --- Right Main Profile Area --- */} 
          <section className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow p-6 relative">
              {/* Avatar */} 
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
                 <img 
                    src={profile.avatar_url || 'https://via.placeholder.com/120'} // Placeholder image
                    alt={profile.username || user?.email || 'User Avatar'}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                 />
              </div>

              {/* Edit Profile Button (Positioned Top Right) */} 
              <div className="absolute top-4 right-4">
                  <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-xs font-medium"
                  >
                      Edit profile
                  </button>
              </div>

              {/* Profile Info (Add padding-top to account for avatar) */} 
              <div className="pt-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{profile.full_name || profile.username || 'User'}</h1>
                {/* Display username only if different from full_name */} 
                {(profile.username && profile.full_name && profile.username !== profile.full_name) && (
                    <p className="text-md text-gray-500">@{profile.username}</p>
                )}
                {/* Placeholder Bio */} 
                <p className="mt-2 text-gray-600">404 bio not found</p>

                {/* Joined Date & Links */} 
                <div className="mt-4 flex justify-center items-center space-x-4 text-sm text-gray-500">
                   <span className="flex items-center"><CalendarIcon /> Joined on {joinedDate}</span>
                   {/* Placeholder GitHub Link */} 
                   <a href="#" className="flex items-center hover:text-gray-700 hover:underline"><GitHubIcon /></a>
                </div>
              </div>
            </div>

            {/* --- Editing Form --- */} 
            {isEditing && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow">
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
                      {/* Add Bio textarea later if needed */} 
                      {/* Add Avatar URL input later if needed */}
                      <div className="flex justify-end space-x-3 pt-2">
                          <button 
                              type="button" 
                              onClick={() => {
                                  setIsEditing(false);
                                  setUsername(profile.username || '');
                                  setFullName(profile.full_name || '');
                                  setUpdateError(null);
                                  setUpdateSuccess(null);
                              }}
                              disabled={updateLoading}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium disabled:opacity-50"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit" 
                              disabled={updateLoading}
                              className={`px-4 py-2 text-white rounded-md text-sm font-medium disabled:opacity-50 ${
                                  updateLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                              }`}
                          >
                              {updateLoading ? 'Saving...' : 'Save Changes'}
                          </button>
                      </div>
                  </form>
              </div>
            )}
            
            {/* Add other profile content sections here (e.g., user's posts) */} 
          </section>
        </div>
      </main>
    </div>
  );
} 