# The Boring Dev Website

This repository contains the code for [www.theboringdev.com](https://www.theboringdev.com) - a clean, modern, minimalist, portfolio-style website showcasing simple and thoughtful tools.

## Project Structure

- Parent Site: The main portfolio site at the root domain (`/`)
- Reword This: A dedicated landing page for the Reword This Chrome extension (`/reword-this`)

## Technology Stack

- **Frontend**: Vite, React, TypeScript, Tailwind CSS
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

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment

This site is configured for deployment on Vercel. Simply connect your repository to Vercel for automatic deployments.

### DNS Configuration for Email

When setting up the domain, configure the following DNS records for email functionality:

- MX Record → mx.zoho.com
- SPF → `v=spf1 include:zoho.com ~all`
- DKIM & DMARC via Zoho setup wizard

## License

All rights reserved. © The Boring Dev.
