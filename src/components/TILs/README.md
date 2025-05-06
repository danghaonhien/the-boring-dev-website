# Today I Learned (TIL) Feature

This directory contains components for the "Today I Learned" feature where users can share short tips, resources, or lessons they've learned.

## Components

- **TILSection**: Main component that combines the form and feed. This is what gets rendered on the landing page.
- **TILPostForm**: Form for adding new TIL posts.
- **TILFeed**: Component that fetches and displays a list of TIL posts.
- **TILCard**: Component for displaying a single TIL post with user info, content, and interaction buttons.

## Database Setup

The feature requires the following tables in Supabase:

1. **profiles**: Optional but recommended table to store user profile data like username and avatar.
2. **til_posts**: Stores the actual TIL posts.
3. **til_likes**: Tracks user likes for posts.
4. **til_comments**: Stores comments on posts (for future implementation).

The SQL script `setup_db.sql` contains the necessary queries to create these tables and set up the appropriate security rules.

### Setting Up the Database

1. Go to your Supabase project's SQL Editor
2. Copy the contents of `setup_db.sql` 
3. Run the script to create tables and policies
4. (Optional) Run the `seed_data.sql` script to populate the database with sample data

### Sample Data

The `seed_data.sql` file includes:
- Sample user profiles with real usernames and avatar URLs
- Several "Today I Learned" posts with different creation dates
- Random likes on posts

This helps with testing and provides a better user experience when first setting up the feature.

### Handling SQL Errors

If you encounter SQL errors while running the setup script, here are some common issues and solutions:

- **"Policy already exists" errors**: The script now includes `DROP POLICY IF EXISTS` statements to avoid this error.
  
- **"Relation already exists" errors**: You can safely ignore these - it just means the table already exists.

- **"Function/trigger already exists" errors**: The script uses `CREATE OR REPLACE` and `DROP TRIGGER IF EXISTS` to handle these cases.

If you continue to have issues, you can run parts of the script individually:

1. First run the table creation statements
2. Then run the policy statements
3. Finally run the function and trigger statements

### Common Errors

If you see errors related to relationship between 'til_posts' and 'user_id', it means:

1. The proper foreign key relationships are not set up in the database
2. The automatic profile creation trigger is not functioning

The code is designed to handle these cases with fallbacks:

- If the profiles table doesn't exist, it will generate usernames from the first part of the user ID
- If there are issues with the foreign key relationships, it will use a simplified query approach

## Usage

To add the TIL section to a page:

```tsx
import { TILSection } from '../components/TILs';

// In your component
return (
  <div>
    {/* Your other components */}
    <TILSection />
  </div>
);
```

## User Authentication

The feature integrates with Supabase's authentication system. Authenticated users can:
- Create new posts
- Like posts
- (Future) Add comments
- (Future) Bookmark posts

Anonymous users can only view posts.

## Extending

To add additional features (like comments or bookmarks), consider creating new tables in Supabase following the same pattern as `til_likes`.

## Troubleshooting

1. **"Could not find a relationship between 'til_posts' and 'user_id'"**: Run the setup_db.sql script to create proper tables and relationships
2. **No username or avatar showing**: Create profiles table and/or update user profiles
3. **"Failed to load posts"**: Make sure all required tables are created and you have appropriate RLS policies
4. **Empty feed with no posts**: Run the seed_data.sql script to populate the database with sample data
5. **General database errors**: Check your Supabase configuration and ensure RLS policies are set up correctly 

## Feature Additions

Some potential enhancements for the future:

1. **Commenting system**: Enable users to comment on TIL posts
2. **Categories/Tags**: Add the ability to categorize posts
3. **Search functionality**: Allow users to search for specific TIL content
4. **Bookmarking**: Let users save TIL posts for future reference
5. **Rich content**: Support for markdown, code blocks, or images in TIL posts 