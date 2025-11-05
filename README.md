# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Multi-Tenant Support

This application supports multiple tenants (Intra and Enterprise). 

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run in default mode (Intra tenant)
npm run dev

# Run in enterprise mode (for https://enterprise-uat.proximus.be/cam/)
npm run dev:enterprise
```

### 🎯 Enterprise Deployment

The CAM application is configured to run at: **`https://enterprise-uat.proximus.be/cam/`**

**Quick Deploy:**
```bash
npm run build:enterprise    # Build for /cam/ route
npm run verify:enterprise   # Verify build configuration
```

See [QUICKSTART.md](./QUICKSTART.md) for immediate access to enterprise route information.

### 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick reference for accessing CAM at `/cam/` route
- **[ENTERPRISE_SETUP.md](./ENTERPRISE_SETUP.md)** - Detailed local development setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide

### 🧪 Local Testing

Test the enterprise route locally before deploying:

```bash
cp .env.enterprise .env.local
npm run dev:enterprise
# Access at: http://localhost:8000/cam/
```

Test in iframe (simulates enterprise portal):
```
http://localhost:8000/iframe-test.html
```
