# The Boring Dev Website

This repository contains the code for [www.theboringdev.com](https://www.theboringdev.com) - a clean, modern, minimalist, portfolio-style website showcasing simple and thoughtful tools.

## Project Structure

- Parent Site: The main portfolio site at the root domain (`/`)
- Reword This: A dedicated landing page for the Reword This Chrome extension (`/reword-this`)

## Technology Stack

- **Frontend**: Vite, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database)
- **Deployment**: Vercel
- **Contact**: Zoho Mail with `contact@theboringdev.com`

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/theboringdev-website.git
cd theboringdev-website
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with your Supabase credentials
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment on Vercel

### Preparing for Deployment

1. Install the Vercel CLI (optional)
```bash
npm install -g vercel
```

2. Run our deployment helper script to check your setup
```bash
node deploy-vercel.js
```

### Setting Up Vercel Environment Variables

When deploying to Vercel, make sure to set the following environment variables in the Vercel dashboard:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous API key

### Deployment Options

#### Option 1: Using Vercel CLI
```bash
vercel
```

Or for production deployment:
```bash
vercel --prod
```

#### Option 2: Vercel Dashboard

Connect your GitHub repository to Vercel for automatic deployments from your main branch.

### Security Considerations

- Environment variables are automatically encrypted by Vercel
- The `vercel.json` file includes security headers to protect your site
- Supabase Row Level Security (RLS) policies are in place to protect your data
- Database operations use appropriate authentication checks

### Post-Deployment Checks

After deploying, verify:
- The waitlist form works correctly
- Admin login functionality is secure
- RLS policies are effectively protecting your data
- All environment variables are correctly set

## Database Setup

To set up the Supabase database:

1. Create a new Supabase project
2. Run the SQL script in `product-docs/reword-waitlist-supabase-setup.sql`
3. Verify tables and RLS policies are created correctly

## DNS Configuration for Email

When setting up the domain, configure the following DNS records for email functionality:

- MX Record → mx.zoho.com
- SPF → `v=spf1 include:zoho.com ~all`
- DKIM & DMARC via Zoho setup wizard

## License

All rights reserved. © The Boring Dev.
