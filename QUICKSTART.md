# Quick Reference: Accessing CAM at https://enterprise-uat.proximus.be/cam/

## Summary

The CAM application is configured to run at the `/cam/` route on the enterprise domain.

**Main URL**: `https://enterprise-uat.proximus.be/cam/`

## How It Works

1. **Base Path Configuration**: The app uses `VITE_BASE_PATH=/cam/`
2. **React Router**: Configured with `basename="/cam/"`
3. **Build Output**: All assets reference `/cam/` prefix

## Available Routes

| Route | Full URL |
|-------|----------|
| Home | `https://enterprise-uat.proximus.be/cam/` |
| Search | `https://enterprise-uat.proximus.be/cam/pages/search` |
| Products | `https://enterprise-uat.proximus.be/cam/products/:firmId/:firmName` |

## Local Testing

Test the enterprise route locally before deploying:

```bash
# 1. Copy enterprise configuration
cp .env.enterprise .env.local

# 2. Run in enterprise mode
npm run dev:enterprise

# 3. Access at:
http://localhost:8000/cam/
```

## Build for Deployment

```bash
# Build for enterprise
npm run build:enterprise

# Verify build
npm run verify:enterprise

# Test the build
npm run preview:enterprise
```

## Deploy to Server

1. Build the application:
   ```bash
   npm run build:enterprise
   ```

2. Upload `dist/` contents to `/cam/` on your server:
   ```
   Server path: /cam/
   Upload: contents of dist/ folder
   ```

3. Configure server for SPA routing (see DEPLOYMENT.md)

4. Access at: `https://enterprise-uat.proximus.be/cam/`

## Iframe Embedding

If embedding in enterprise portal:

```html
<iframe 
    src="https://enterprise-uat.proximus.be/cam/"
    title="CAM Application"
></iframe>
```

Or for a specific page:

```html
<iframe 
    src="https://enterprise-uat.proximus.be/cam/pages/search"
    title="CAM Application - Search"
></iframe>
```

## Troubleshooting

### Can't access /cam/ route
- Verify server deployed to correct path
- Check server configuration for SPA routing
- Ensure base path in build is `/cam/`

### 404 on sub-routes
- Server must serve index.html for all /cam/* routes
- Add .htaccess / nginx config (see DEPLOYMENT.md)

### Assets not loading
- Verify dist contents uploaded to /cam/ directory
- Check browser console for 404 errors
- Ensure build used `npm run build:enterprise`

## Quick Commands

```bash
# Local development
npm run dev:enterprise

# Build and verify
npm run build:enterprise && npm run verify:enterprise

# Preview build
npm run preview:enterprise
```

## Need Help?

- See `ENTERPRISE_SETUP.md` for detailed local setup
- See `DEPLOYMENT.md` for detailed deployment instructions
- Check build output with: `npm run verify:enterprise`
