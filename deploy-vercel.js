#!/usr/bin/env node

/**
 * Vercel Deployment Script
 * 
 * This script helps prepare the application for deployment to Vercel
 * by ensuring environment variables are properly set.
 * 
 * Usage:
 * node deploy-vercel.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}==== Vercel Deployment Helper ====${colors.reset}\n`);

// Check for the Vercel CLI
let vercelInstalled = false;
try {
  execSync('vercel --version', { stdio: 'ignore' });
  vercelInstalled = true;
  console.log(`${colors.green}✓ Vercel CLI is installed${colors.reset}`);
} catch (error) {
  console.log(`${colors.yellow}! Vercel CLI is not installed${colors.reset}`);
  console.log(`  Run: ${colors.cyan}npm install -g vercel${colors.reset}\n`);
}

// Check for environment files
const envFiles = ['.env'];
const missingEnvFiles = [];

envFiles.forEach(file => {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    missingEnvFiles.push(file);
  }
});

if (missingEnvFiles.length > 0) {
  console.log(`${colors.yellow}! Missing environment files: ${missingEnvFiles.join(', ')}${colors.reset}`);
  console.log(`  Create these files with appropriate variables\n`);
} else {
  console.log(`${colors.green}✓ Environment files exist${colors.reset}`);
  
  // Check for sensitive info in .env files that shouldn't be committed
  try {
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
    if (envContent.includes('VITE_SUPABASE_URL') && envContent.includes('VITE_SUPABASE_ANON_KEY')) {
      console.log(`${colors.yellow}! Environment files contain sensitive information${colors.reset}`);
      console.log(`  Make sure .env is in .gitignore and values are set in Vercel dashboard\n`);
    } else {
      console.log(`${colors.green}✓ No obvious sensitive data in checked files${colors.reset}`);
    }
  } catch (err) {
    console.log(`${colors.yellow}! Error reading environment files${colors.reset}`);
  }
}

// Print deployment instructions
console.log(`\n${colors.cyan}=== Deployment Instructions ===${colors.reset}`);
console.log(`
1. ${colors.magenta}Set up environment variables in Vercel${colors.reset}
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

2. ${colors.magenta}Deploy using one of these methods:${colors.reset}
   ${vercelInstalled ? 
     `- Run: ${colors.cyan}vercel${colors.reset} or ${colors.cyan}vercel --prod${colors.reset}` : 
     `- Install Vercel CLI: ${colors.cyan}npm install -g vercel${colors.reset}`}
   - Or deploy via the Vercel dashboard

3. ${colors.magenta}After deployment:${colors.reset}
   - Verify the waitlist form works correctly
   - Test admin login functionality
   - Confirm SQL tables are secured properly

${colors.green}Recommended:${colors.reset} Use the Vercel dashboard to set up:
- Custom domain
- Analytics
- Monitoring
- Automatic production deployments from your GitHub repository
`);

console.log(`${colors.cyan}=============================${colors.reset}`); 