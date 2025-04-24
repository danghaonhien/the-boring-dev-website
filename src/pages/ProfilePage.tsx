import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, uploadAvatar } from '../utils/supabaseClient';
import Header from '../components/Header';
import Toast from '../components/Toast';

// Icon components for profile sections
const CalendarIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>;
const GitHubIcon = () => <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>;
const PostIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>;
const CommentIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.192-3.377A6.984 6.984 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>;
const TagIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a1 1 0 011-1h5a.997.997 0 01.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>;

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
  website_url: string | null;
  location: string | null;
  bio: string | null;
  pronouns: string | null;
  work: string | null;
  education: string | null;
  display_email: boolean;
}

export default function ProfilePage() {
  const { user, refreshUserProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [work, setWork] = useState('');
  const [education, setEducation] = useState('');
  const [displayEmail, setDisplayEmail] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
            // First check if users entry exists
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id, email')
                .eq('id', user.id)
                .single();
                
            // If user record doesn't exist, create it
            if (userError && userError.code === 'PGRST116') {
                const { error: insertUserError } = await supabase
                    .from('users')
                    .insert({ 
                        id: user.id,
                        email: user.email
                    });
                
                if (insertUserError) {
                    console.error("Failed to create user record");
                }
            }
            
            // Now fetch profile data
            const { data, error: fetchError, status } = await supabase
                .from('profiles')
                .select(`username, full_name, avatar_url, updated_at, website_url, location, bio, pronouns, work, education, display_email`)
                .eq('id', user.id)
                .single();

            if (fetchError) {
                // If no data was found (PGRST116 is the "no rows returned" error)
                if (fetchError.code === 'PGRST116' || status === 406) {
                    // Try to create a profile
                    const { error: insertError } = await supabase
                        .from('profiles')
                        .insert({ 
                            id: user.id,
                            updated_at: new Date().toISOString()
                        });
                    
                    if (insertError) {
                        console.error("Error creating profile");
                    }
                    
                    // Check if profile was created successfully
                    const { data: checkData, error: checkError } = await supabase
                        .from('profiles')
                        .select('id')
                        .eq('id', user.id)
                        .single();
                    
                    // Set empty profile data
                    if (isMounted) {
                        const emptyProfile = {
                            username: null, full_name: null, avatar_url: null, updated_at: new Date().toISOString(),
                            website_url: null, location: null, bio: null, pronouns: null,
                            work: null, education: null, display_email: false
                        };
                        
                        setProfile(emptyProfile);
                        // Reset all form fields to empty values
                        setUsername('');
                        setFullName('');
                        setWebsiteUrl('');
                        setLocation('');
                        setBio('');
                        setPronouns('');
                        setWork('');
                        setEducation('');
                        setDisplayEmail(false);
                        setAvatarPreview(null);
                    }
                } else {
                    // For other errors
                    console.error("Profile fetch error");
                    throw fetchError;
                }
            } else if (data) {
                if (isMounted) {
                    setProfile(data);
                    setUsername(data.username || '');
                    setFullName(data.full_name || '');
                    setWebsiteUrl(data.website_url || '');
                    setLocation(data.location || '');
                    setBio(data.bio || '');
                    setPronouns(data.pronouns || '');
                    setWork(data.work || '');
                    setEducation(data.education || '');
                    setDisplayEmail(data.display_email || false);
                    setAvatarPreview(data.avatar_url);
                }
            }
        } catch (err: any) {
            console.error("Error in profile fetch");
            if (isMounted) setError("Could not fetch profile data: " + (err.message || "Unknown error"));
        } finally {
            if (isMounted) setLoading(false);
        }
    }
    
    fetchProfile();
    return () => { isMounted = false; };
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            setToastMessage("File is too large. Maximum size is 2MB.");
            setToastType('error');
            setAvatarFile(null);
            setAvatarPreview(profile?.avatar_url || null);
            e.target.value = '';
            return;
        }
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setToastMessage(null);
        setToastType(null);
    } else {
        setAvatarFile(null);
        setAvatarPreview(profile?.avatar_url || null);
    }
  };

  const handleCloseToast = () => {
      setToastMessage(null);
      setToastType(null);
  };

  const resetFormFields = () => {
      setUsername(profile?.username || '');
      setFullName(profile?.full_name || '');
      setWebsiteUrl(profile?.website_url || '');
      setLocation(profile?.location || '');
      setBio(profile?.bio || '');
      setPronouns(profile?.pronouns || '');
      setWork(profile?.work || '');
      setEducation(profile?.education || '');
      setDisplayEmail(profile?.display_email || false);
      setAvatarFile(null);
      setAvatarPreview(profile?.avatar_url || null);
      handleCloseToast();
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateLoading(true);
    handleCloseToast();

    if (!user) {
        setToastMessage("Cannot update profile: User not found.");
        setToastType("error");
        setUpdateLoading(false);
        return;
    }
    if (!username.trim()) {
        setToastMessage("Username cannot be empty.");
        setToastType("error");
        setUpdateLoading(false);
        return;
    }

    try {
        let avatarPublicUrl: string | null = profile?.avatar_url || null;

        if (avatarFile) {
            const uploadedUrl = await uploadAvatar(user.id, avatarFile);
            
            if (!uploadedUrl) {
                setToastMessage("Failed to upload avatar. Please try again.");
                setToastType('error');
            } else {
                avatarPublicUrl = uploadedUrl;
            }
        }

        const updates = {
            id: user.id,
            username: username.trim(),
            full_name: fullName.trim(),
            website_url: websiteUrl.trim() || null,
            location: location.trim() || null,
            bio: bio.trim() || null,
            pronouns: pronouns.trim() || null,
            work: work.trim() || null,
            education: education.trim() || null,
            display_email: displayEmail,
            avatar_url: avatarPublicUrl,
            updated_at: new Date().toISOString(),
        };

        const { error: updateError } = await supabase
            .from('profiles')
            .upsert(updates);

        if (updateError) {
            throw updateError;
        }

        // Refresh user profile in context to reflect changes
        await refreshUserProfile();
        
        const updatedProfile = {
            ...profile,
            ...updates
        };
        setProfile(updatedProfile as Profile);
        setIsEditing(false);
        setToastMessage("Profile updated successfully!");
        setToastType("success");
    } catch (err: any) {
        console.error("Profile update error: ", err);
        setToastMessage(`Failed to update profile: ${err.message || "Unknown error"}`);
        setToastType("error");
    } finally {
        setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Profile</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700 dark:border-gray-300"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md mb-8">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={avatarPreview || profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'User')}&background=A0AEC0&color=FFFFFF&size=64&rounded=true&bold=true`} 
                    alt={`${profile?.username || user?.email} avatar`} 
                    className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" 
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile?.full_name || profile?.username || user?.email}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{profile?.username || 'username'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
            
            {/* Profile Content */}
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="p-6">
                <div className="space-y-6">
                  {/* Avatar Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Picture</label>
                    <div className="flex items-center space-x-5">
                      <img 
                        src={avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'User')}&background=A0AEC0&color=FFFFFF&size=64&rounded=true&bold=true`} 
                        alt="Avatar preview" 
                        className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" 
                      />
                      <div className="flex-1">
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 inline-block">
                          Change Avatar
                        </label>
                        <input
                          id="avatar-upload"
                          name="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Required Fields */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username *</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input
                        type="text"
                        id="full-name"
                        name="full-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  {/* Optional Fields */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="work" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work</label>
                      <input
                        type="text"
                        id="work"
                        name="work"
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Company or project"
                      />
                    </div>
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Education</label>
                      <input
                        type="text"
                        id="education"
                        name="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="School or institution"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pronouns</label>
                    <input
                      type="text"
                      id="pronouns"
                      name="pronouns"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="e.g. they/them, she/her"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="display-email"
                      name="display-email"
                      type="checkbox"
                      checked={displayEmail}
                      onChange={(e) => setDisplayEmail(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="display-email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Display email on public profile
                    </label>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="mt-6 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetFormFields}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={updateLoading}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-6">
                {/* Profile Info Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About</h3>
                    <dl className="space-y-4">
                      {bio && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">{bio}</dd>
                        </div>
                      )}
                      
                      {pronouns && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Pronouns</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{pronouns}</dd>
                        </div>
                      )}
                      
                      {websiteUrl && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                              {websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                          </dd>
                        </div>
                      )}
                      
                      {location && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{location}</dd>
                        </div>
                      )}
                      
                      {displayEmail && user?.email && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Experience & Education</h3>
                    <dl className="space-y-4">
                      {work && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Work</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{work}</dd>
                        </div>
                      )}
                      
                      {education && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Education</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{education}</dd>
                        </div>
                      )}
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Member since</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          <CalendarIcon /> {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                        </dd>
                      </div>
                      
                      {profile?.updated_at && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last updated</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <CalendarIcon /> {new Date(profile.updated_at).toLocaleDateString()}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Toast Messages */}
      {toastMessage && toastType && (
        <Toast 
          message={toastMessage}
          type={toastType}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}