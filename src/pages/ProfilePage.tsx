import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import Header from '../components/Header';
import Toast from '../components/Toast';
import FormField from '../components/FormField';
import CheckboxField from '../components/CheckboxField';
import AvatarUpload from '../components/AvatarUpload';
import Button from '../components/Button';
import FormSection from '../components/FormSection';
import FormContainer from '../components/FormContainer';

// Placeholder Icons (replace with actual icons, e.g., from react-icons)
const CalendarIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>;
const GitHubIcon = () => <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>;
const PostIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>; // Example icon
const CommentIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.192-3.377A6.984 6.984 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>; // Example icon
const TagIcon = () => <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a1 1 0 011-1h5a.997.997 0 01.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>; // Example icon

// Default avatar as base64 to avoid placeholder service issues
const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNkMWQxZDE7c3Ryb2tlOiNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjhweCIvPjxwYXRoIGQ9Ik0xMTUuNSwxNDBjLTI1LjkyLDAtNDctMjEuMDgtNDctNDdTODkuNTgsNDYsMTE1LjUsNDZzNDcsMjEuMDgsNDcsNDctMjEuMDgsNDctNDcsNDdabTU0LjgsNDcuODlMMTQ2LjM1LDE2NGMtOC45MS01LjEzLTE5LjMyLTguMDktMzAuODUtOC4wOXMtMjIsNC00MS4zNSwxNC41OVY5MC41OUExMTYuNjIsMTE2LjYyLDAsMCwwLDM0LDEyOC45MmMwLDYzLjcxLDUxLjc5LDExNS41LDExNS41LDExNS41QTExNS41NSwxMTUuNTUsMCwwLDAsMjIwLDIwOC42N2MtMTEuNy0xMC44Ni0yOC45MS0xOS40NC00OS43LTIwLjc4WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";

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
            try {
                // Skip bucket checking and try upload directly
                const fileExt = avatarFile.name.split('.').pop();
                const filePath = `${user.id}/${Date.now()}.${fileExt}`;

                console.log("Attempting to upload directly to path:", filePath);

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, avatarFile, { upsert: true });

                if (uploadError) {
                    console.error("Avatar upload error:", uploadError);
                    setToastMessage(`Upload failed: ${uploadError.message}`);
                    setToastType('error');
                    setUpdateLoading(false);
                    return;
                }

                console.log("Upload successful:", uploadData);
                
                const { data: urlData } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                if (!urlData?.publicUrl) {
                    console.error("Could not get public URL for avatar");
                    setToastMessage("Failed to get avatar URL after upload.");
                    setToastType('error');
                    setUpdateLoading(false);
                    return;
                }
                
                console.log("Public URL generated:", urlData.publicUrl);
                avatarPublicUrl = urlData.publicUrl;
            } catch (uploadErr: unknown) {
                const errorMessage = uploadErr instanceof Error 
                    ? uploadErr.message 
                    : "Unknown error during upload";
                console.error("Unexpected error during avatar upload:", uploadErr);
                setToastMessage(`Avatar upload error: ${errorMessage}`);
                setToastType('error');
                setUpdateLoading(false);
                return;
            }
        }

        // Continue with profile update if avatar upload was successful or skipped
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

        console.log("Updating profile with:", updates);

        const { data: updateData, error: updateError } = await supabase.from('profiles').upsert(updates);

        if (updateError) {
            console.error("Profile update error:", updateError);
            let specificError = 'Failed to update profile. Please try again.';
            if (updateError.message.includes('duplicate key value violates unique constraint "profiles_username_key"')) {
                specificError = 'Username is already taken. Please choose another.';
            } else if (updateError.message.includes('violates row-level security policy')) {
                specificError = 'You do not have permission to perform this update.';
            } else {
                specificError = `Update error: ${updateError.message}`;
            }
            setToastMessage(specificError);
            setToastType('error');
            setUpdateLoading(false);
            return;
        }

        console.log("Profile update successful:", updateData);
        setProfile(prev => prev ? { ...prev, ...updates } as Profile : updates as Profile);
        setToastMessage("Profile updated successfully!");
        setToastType('success');
        setIsEditing(false);
        setAvatarFile(null);

        // Refresh the user profile data in the context
        await refreshUserProfile();

    } catch (err: any) {
        console.error("Error during profile update process:", err);
        setToastMessage(`An unexpected error occurred: ${err.message || "Unknown error"}`);
        setToastType('error');
    } finally {
        setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boring-dark">
            <div className="text-gray-800 dark:text-boring-offwhite">Loading profile...</div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boring-dark">
             <div className="p-6 text-red-500 dark:text-red-400">Error: {error}</div>
        </div>
    );
  }

  if (!profile) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boring-dark">
            <div className="p-6 text-gray-800 dark:text-boring-offwhite">Profile not found or initializing...</div>
          </div>
      );
  }

  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-boring-dark relative p-0">
      {toastMessage && toastType && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={handleCloseToast}
        />
      )}

      <Header isRevealed={true} />
      
      <main className="w-full">
        <div className="w-full h-48 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 mb-[-60px]"></div>
        
        <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <section className="w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
                   <img
                      src={isEditing ? (avatarPreview || DEFAULT_AVATAR) : (profile.avatar_url || DEFAULT_AVATAR)}
                      alt={profile.full_name || profile.username || 'User Avatar'}
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_AVATAR;
                      }}
                   />
                </div>

                {!isEditing && (
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-3 py-1.5 bg-indigo-600 dark:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 text-xs font-medium"
                        >
                            Edit profile
                        </button>
                    </div>
                )}

                <div className="pt-20 text-center">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-boring-offwhite">{profile.full_name || profile.username || 'User'}</h1>
                  {(profile.username) && (
                      <p className="text-md text-gray-500 dark:text-gray-400">@{profile.username}</p>
                  )}
                  {profile.pronouns && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">({profile.pronouns})</p>
                  )}

                  <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-md mx-auto">{profile.bio || "404 bio not found"}</p>

                  {(profile.work || profile.education) && (
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                           {profile.work && <p>{profile.work}</p>}
                           {profile.education && <p>{profile.education}</p>}
                      </div>
                   )}

                  <div className="mt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                     {profile.location && (
                         <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> {profile.location}</span>
                     )}
                     <span className="flex items-center"><CalendarIcon /> Joined on {joinedDate}</span>
                     {profile.website_url && (
                          <a href={profile.website_url.startsWith('http') ? profile.website_url : `https://${profile.website_url}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-700 dark:hover:text-gray-300 hover:underline">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z" /><path d="M8.603 14.714a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 005.656 5.656l3-3a4 4 0 00-.225-5.865.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.665l-3 3z" /></svg>
                              Website
                          </a>
                     )}
                      {profile.display_email && user?.email && (
                           <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg> {user.email}</span>
                      )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <FormContainer title="Edit Profile">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <FormSection title="User">
                      <AvatarUpload 
                        previewUrl={avatarPreview}
                        defaultUrl={DEFAULT_AVATAR}
                        onFileChange={handleAvatarChange}
                        disabled={updateLoading}
                      />

                      <FormField
                          id="fullName"
                          label="Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={updateLoading}
                          placeholder="Your full name"
                      />

                      <FormField
                          id="email"
                          type="email"
                          label="Email"
                          value={user?.email || ''}
                          disabled={true}
                          placeholder="Your email"
                      />

                      <CheckboxField
                          id="displayEmail"
                          label="Display email on profile"
                          checked={displayEmail}
                          onChange={(e) => setDisplayEmail(e.target.checked)}
                          disabled={updateLoading}
                      />

                      <FormField
                          id="username"
                          label="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={updateLoading}
                          placeholder="Your unique username"
                          required
                      />
                    </FormSection>

                    <FormSection title="Basic">
                      <FormField
                          id="websiteUrl"
                          type="url"
                          label="Website URL"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          disabled={updateLoading}
                          placeholder="https://yoursite.com"
                      />

                      <FormField
                          id="location"
                          label="Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          disabled={updateLoading}
                          placeholder="City, Country"
                      />

                      <FormField
                          id="bio"
                          type="textarea"
                          label="Bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          disabled={updateLoading}
                          placeholder="A short bio..."
                          rows={3}
                          helperText={`${bio.length}/200`}
                      />
                    </FormSection>

                    <FormSection title="Personal">
                      <FormField
                          id="pronouns"
                          label="Pronouns"
                          value={pronouns}
                          onChange={(e) => setPronouns(e.target.value)}
                          disabled={updateLoading}
                          placeholder="e.g., she/her, he/him, they/them"
                      />
                    </FormSection>

                    <FormSection title="Work">
                      <FormField
                          id="work"
                          label="Work"
                          value={work}
                          onChange={(e) => setWork(e.target.value)}
                          disabled={updateLoading}
                          placeholder="What do you do? Example: CEO at ACME Inc."
                      />

                      <FormField
                          id="education"
                          label="Education"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          disabled={updateLoading}
                          placeholder="Where did you go to school?"
                      />
                    </FormSection>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={updateLoading}
                            onClick={() => {
                                setIsEditing(false);
                                resetFormFields();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={updateLoading}
                        >
                            {updateLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                  </form>
                </FormContainer>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 