# Deployment Guide for Enterprise Tenant

This guide explains how to deploy the CAM application to the enterprise tenant at `https://enterprise-uat.proximus.be/cam/`.

## Overview

The application is configured to run at the `/cam/` route on the enterprise domain through:
- Base path configuration: `VITE_BASE_PATH=/cam/`
- React Router basename: `/cam/`
- Asset paths in build: `/cam/assets/...`

## Quick Deployment Steps

### 1. Build for Enterprise

```bash
npm run build:enterprise
```

This creates a production build in the `dist/` folder with:
- All assets referenced with `/cam/` prefix
- React Router configured for `/cam/` base path
- Optimized and minified code

### 2. Deploy to Server

Upload the contents of the `dist/` folder to your enterprise server at the `/cam/` directory.

**Important**: Deploy the **contents** of `dist/`, not the `dist/` folder itself.

Your server structure should look like:
```
/cam/
  ├── index.html
  ├── assets/
  │   ├── index-xxxxx.js
  │   └── index-xxxxx.css
  ├── iframe-test.html
  └── vite.svg
```

### 3. Verify Deployment

After deployment, the application should be accessible at:
- Main route: `https://enterprise-uat.proximus.be/cam/`
- Pages route: `https://enterprise-uat.proximus.be/cam/pages/search`
- Products route: `https://enterprise-uat.proximus.be/cam/products/:firmId/:firmName`

## Route Structure

With `VITE_BASE_PATH=/cam/`, the routes work as follows:

| App Route | Full URL |
|-----------|----------|
| `/` | `https://enterprise-uat.proximus.be/cam/` |
| `/pages/search` | `https://enterprise-uat.proximus.be/cam/pages/search` |
| `/products/:firmId/:firmName` | `https://enterprise-uat.proximus.be/cam/products/:firmId/:firmName` |

## Server Configuration

### Apache (.htaccess)

If using Apache, place this `.htaccess` file in the `/cam/` directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /cam/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /cam/index.html [L]
</IfModule>
```

### Nginx

If using Nginx, add this to your server configuration:

```nginx
location /cam/ {
    alias /path/to/your/cam/dist/;
    try_files $uri $uri/ /cam/index.html;
    
    # Optional: Add cache headers for assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### IIS (web.config)

If using IIS, place this `web.config` in the `/cam/` directory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/cam/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Environment-Specific Builds

### For UAT Environment
```bash
npm run build:enterprise
# Deploy to: enterprise-uat.proximus.be/cam/
```

### For ITT Environment
```bash
npm run build:enterprise
# Deploy to: enterprise-itt.proximus.be/cam/
```

### For Production
```bash
npm run build:enterprise
# Deploy to: enterprise.proximus.be/cam/
```

All three use the same build with `/cam/` base path.

## Iframe Embedding

If the CAM application is embedded as an iframe in the enterprise portal:

### Parent Page (Enterprise Portal)
```html
<iframe 
    src="https://enterprise-uat.proximus.be/cam/pages/search"
    title="CAM Application"
    width="100%"
    height="800px"
    frameborder="0"
></iframe>
```

### Communication
The CAM app will automatically:
- Detect it's running in an iframe
- Send a ready notification to the parent window
- Support postMessage communication

## Troubleshooting

### Routes return 404
- Ensure server is configured to serve `index.html` for all `/cam/*` routes
- Check that the server configuration matches your web server type
- Verify the base path in the build matches the deployment path

### Assets not loading (404 errors)
- Verify the `dist/` folder contents are in the `/cam/` directory
- Check that `VITE_BASE_PATH=/cam/` was set during build
- Ensure the build command was `npm run build:enterprise`

### Blank page after deployment
- Open browser console and check for errors
- Verify JavaScript files are loading (check Network tab)
- Ensure CORS headers allow loading resources
- Check if Content Security Policy (CSP) headers block resources

### API calls failing
- Verify `VITE_API_URL` points to the correct backend
- Check CORS configuration on the backend
- Ensure network policies allow the enterprise domain to access the API

## CI/CD Pipeline Example

### GitHub Actions

```yaml
name: Deploy to Enterprise UAT

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build for enterprise
        run: npm run build:enterprise
        
      - name: Deploy to server
        run: |
          # Add your deployment commands here
          # Example: rsync, scp, or cloud provider CLI
          rsync -avz --delete dist/ user@enterprise-uat.proximus.be:/path/to/cam/
```

## Verification Checklist

After deployment, verify:

- [ ] Main page loads: `https://enterprise-uat.proximus.be/cam/`
- [ ] Direct routes work: `https://enterprise-uat.proximus.be/cam/pages/search`
- [ ] Assets load correctly (check browser Network tab)
- [ ] Navigation within the app works
- [ ] API calls succeed
- [ ] Iframe embedding works (if applicable)
- [ ] No console errors in browser

## Local Testing Before Deployment

Always test the production build locally before deploying:

```bash
# Build for enterprise
npm run build:enterprise

# Preview the build
npm run preview:enterprise

# Test at: http://localhost:8000/cam/
```

This ensures the build works correctly with the `/cam/` base path before deploying to the actual server.

## Support

If you encounter issues during deployment:
1. Check the build output for errors
2. Verify server logs for deployment issues
3. Test the production build locally first
4. Ensure all environment variables are set correctly
5. Refer to ENTERPRISE_SETUP.md for local development setup
