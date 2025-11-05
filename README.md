# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Multi-Tenant Support

This application supports multiple tenants (Intra and Enterprise). 

### Quick Start

```bash
# Install dependencies
npm install

# Run in default mode (Intra tenant)
npm run dev

# Run in enterprise mode
npm run dev:enterprise
```

### Enterprise Local Setup

For detailed instructions on setting up and testing the enterprise tenant locally, see [ENTERPRISE_SETUP.md](./ENTERPRISE_SETUP.md).

This allows you to test your changes for `enterprise-uat.proximus.be/cam/` locally without deploying to UAT environment every time.

### Environment Configuration

Copy `.env.example` to `.env.local` and configure as needed:

```bash
cp .env.example .env.local
```

For enterprise tenant testing:
```bash
cp .env.enterprise .env.local
npm run dev:enterprise
```

Access at: `http://localhost:8000/cam/`
