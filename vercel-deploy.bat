@echo off
echo ===== Vercel Deployment Helper =====
echo.

REM Check for Vercel CLI
where vercel >nul 2>&1
if %errorlevel% equ 0 (
  echo [32m✓ Vercel CLI is installed[0m
) else (
  echo [33m! Vercel CLI is not installed[0m
  echo   Run: npm install -g vercel
  echo.
)

REM Check for environment files
if exist .env (
  echo [32m✓ .env file exists[0m
) else (
  echo [33m! Missing .env file[0m
  echo   Create this file with appropriate variables
  echo.
)

echo.
echo ===== Deployment Instructions =====
echo.
echo 1. Set up environment variables in Vercel:
echo    - VITE_SUPABASE_URL
echo    - VITE_SUPABASE_ANON_KEY
echo.
echo 2. Deploy using one of these methods:
if %errorlevel% equ 0 (
  echo    - Run: vercel or vercel --prod
) else (
  echo    - Install Vercel CLI: npm install -g vercel
)
echo    - Or deploy via the Vercel dashboard
echo.
echo 3. After deployment:
echo    - Verify the waitlist form works correctly
echo    - Test admin login functionality
echo    - Confirm SQL tables are secured properly
echo.
echo Recommended: Use the Vercel dashboard to set up:
echo - Custom domain
echo - Analytics
echo - Monitoring
echo - Automatic production deployments from your GitHub repository
echo.
echo ============================= 