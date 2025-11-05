# Local Enterprise Environment Setup Guide

This guide explains how to set up your local development environment to test the CAM application as if it's running on the enterprise tenant (enterprise-uat.proximus.be/cam/).

## Overview

The application now supports multiple tenants:
- **Intra Tenant**: intrauat.web.bc/cam/pages/search
- **Enterprise Tenant**: enterprise-uat.proximus.be/cam/

**Important**: In the enterprise environment, the CAM application is embedded as an **iframe** within the enterprise portal.

## Quick Start - Testing Enterprise Locally

### Option 1: Using Environment Variable (Simplest)

1. Copy the enterprise environment file:
   ```bash
   cp .env.enterprise .env.local
   ```

2. Run the development server:
   ```bash
   npm run dev:enterprise
   ```

3. Open your browser at: `http://localhost:8000/cam/pages/search`

   The application will now run with:
   - Base path: `/cam/`
   - Enterprise tenant configuration
   - Same behavior as enterprise-uat.proximus.be

### Option 2: Testing as Iframe (Recommended for Enterprise)

Since the CAM application runs inside an iframe in the enterprise portal, you should test it in that context:

1. **Start the dev server**:
   ```bash
   cp .env.enterprise .env.local
   npm run dev:enterprise
   ```

2. **Open the iframe test page**:
   ```
   http://localhost:8000/iframe-test.html
   ```
   
   This simulates the enterprise portal with your CAM app embedded as an iframe.

3. **Features of the test page**:
   - Shows how the app looks inside the enterprise portal
   - Tests iframe communication (postMessage)
   - Reload and fullscreen controls
   - Console log to see iframe messages
   - Simulates the real enterprise environment

### Option 3: Using Custom Domain (Advanced)

If you want to test with the actual domain name locally:

1. **Edit your hosts file**:
   
   **On Linux/Mac**:
   ```bash
   sudo nano /etc/hosts
   ```
   
   **On Windows**:
   ```
   Open: C:\Windows\System32\drivers\etc\hosts (as Administrator)
   ```
   
   Add this line:
   ```
   127.0.0.1  enterprise-uat.proximus.be
   ```

2. **Configure environment**:
   ```bash
   cp .env.enterprise .env.local
   ```

3. **Run the dev server**:
   ```bash
   npm run dev:enterprise
   ```

4. **Access in browser**:
   ```
   http://enterprise-uat.proximus.be:8000/cam/pages/search
   ```

## Environment Configuration

### Available Environment Files

- `.env.example` - Template with all available options
- `.env.local` - Your local configuration (not committed to git)
- `.env.enterprise` - Pre-configured for enterprise tenant

### Environment Variables

```bash
# Tenant Configuration
VITE_TENANT=enterprise          # Options: 'intra' or 'enterprise'

# API Base URL
VITE_API_URL=https://backend-nodejs-suby.onrender.com

# Base Path for deployment
VITE_BASE_PATH=/cam/            # Path prefix for all routes

# Development Mode
VITE_DEV_MODE=true
```

## Development Workflows

### Testing Intra Tenant (Default)
```bash
npm run dev
# Access at: http://localhost:8000/
```

### Testing Enterprise Tenant
```bash
npm run dev:enterprise
# Access at: http://localhost:8000/cam/
```

### Building for Enterprise Production
```bash
npm run build:enterprise
```

## Iframe Support

The CAM application includes built-in iframe support since it's embedded in the enterprise portal:

### Features

1. **Automatic iframe detection**: The app detects when it's running inside an iframe
2. **Parent-child communication**: Uses postMessage API for secure communication
3. **Iframe-specific styling**: Optimized CSS for iframe display
4. **Ready notifications**: Sends a ready message to the parent when loaded

### Testing Iframe Integration

Use the included test page to simulate the enterprise portal:

```bash
# Start dev server
npm run dev:enterprise

# Open in browser
http://localhost:8000/iframe-test.html
```

### Iframe Communication API

The application provides utilities in `src/iframe.js`:

```javascript
import { isInIframe, sendToParent, listenToParent } from './iframe.js';

// Check if running in iframe
if (isInIframe()) {
  console.log('Running inside iframe');
}

// Send message to parent
sendToParent({
  type: 'USER_ACTION',
  data: { action: 'search', query: 'test' }
});

// Listen for messages from parent
const cleanup = listenToParent((data, origin) => {
  console.log('Message from parent:', data);
});
```

### Iframe Security

- The app automatically sends a ready notification to the parent window
- PostMessage is used for secure cross-origin communication
- Origin validation can be added in production (see `src/iframe.js`)

## How It Works

1. **Tenant Detection**: The application automatically detects the tenant based on:
   - Environment variable `VITE_TENANT`
   - Hostname in production (auto-detects 'enterprise' or 'intra')

2. **Base Path**: Routes are automatically prefixed with the base path:
   - Intra: `/` 
   - Enterprise: `/cam/`

3. **Configuration**: Tenant-specific settings are loaded from `src/config.js`

## Testing Your Changes

### Before Deploying to UAT

1. **Test locally with enterprise config**:
   ```bash
   npm run dev:enterprise
   ```

2. **Verify routes work**:
   - Home: `http://localhost:8000/cam/`
   - Search: `http://localhost:8000/cam/pages/search`
   - Products: `http://localhost:8000/cam/products/:firmId/:firmName`

3. **Test API calls**: Check browser console/network tab to ensure API calls work correctly

4. **Build and preview**:
   ```bash
   npm run build:enterprise
   npm run preview:enterprise
   ```

## Troubleshooting

### Routes not working with /cam/ prefix
- Check that `.env.local` has `VITE_BASE_PATH=/cam/`
- Restart the dev server after changing environment variables
- Clear browser cache

### API calls failing
- Verify `VITE_API_URL` in `.env.local`
- Check network tab in browser dev tools
- Ensure backend is accessible from your local machine

### CSS/Assets not loading
- Ensure Vite's `base` configuration is set correctly
- Check that asset paths use relative URLs
- Rebuild the application after config changes

## Additional Notes

### Why This Setup Helps

Before this setup, you had to:
1. Make code changes
2. Deploy to UAT environment
3. Test on enterprise-uat.proximus.be
4. Repeat for every small change

Now you can:
1. Make code changes
2. Run `npm run dev:enterprise`
3. Test immediately at `localhost:8000/cam/`
4. Only deploy when everything works

This saves significant time and allows rapid iteration!

### File Structure
```
.
├── .env.example          # Template for environment variables
├── .env.local            # Your local config (git-ignored)
├── .env.enterprise       # Enterprise preset (committed)
├── src/
│   ├── config.js         # Configuration utility
│   ├── main.jsx          # Uses basename from config
│   └── suby/
│       └── api.js        # Uses API URL from config
└── vite.config.js        # Handles base path in build
```

## Quick Reference

| Task | Command |
|------|---------|
| Start dev (intra) | `npm run dev` |
| Start dev (enterprise) | `npm run dev:enterprise` |
| Build for production (intra) | `npm run build` |
| Build for production (enterprise) | `npm run build:enterprise` |
| Preview build | `npm run preview` |
| Switch tenant | Edit `.env.local` and change `VITE_TENANT` |

## Questions?

If you encounter issues or have questions about the setup, please create an issue in the repository.
