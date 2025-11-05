/**
 * Configuration utility for multi-tenant support
 * Handles tenant-specific configurations and environment variables
 */

// Get tenant from environment variable or auto-detect from hostname
export const getTenant = () => {
  // First check environment variable
  const envTenant = import.meta.env.VITE_TENANT;
  if (envTenant) {
    return envTenant;
  }

  // Auto-detect from hostname in production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname.includes('enterprise')) {
      return 'enterprise';
    } else if (hostname.includes('intra')) {
      return 'intra';
    }
  }

  // Default to intra
  return 'intra';
};

// Get base path from environment or default
export const getBasePath = () => {
  return import.meta.env.VITE_BASE_PATH || '/';
};

// Get API URL from environment
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'https://backend-nodejs-suby.onrender.com';
};

// Check if in development mode
export const isDevMode = () => {
  return import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV;
};

// Get tenant-specific configuration
export const getTenantConfig = () => {
  const tenant = getTenant();
  
  const configs = {
    intra: {
      name: 'Intra Tenant',
      domains: ['intrauat.web.bc', 'intrait.web.bc', 'intra.web.bc'],
      basePath: '/',
      theme: 'default'
    },
    enterprise: {
      name: 'Enterprise Tenant',
      domains: ['enterprise-uat.proximus.be', 'enterprise-itt.proximus.be', 'enterprise.proximus.be'],
      basePath: '/cam/',
      theme: 'enterprise'
    }
  };

  return configs[tenant] || configs.intra;
};

// Get full URL for navigation
export const getFullPath = (path) => {
  const basePath = getBasePath();
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  // Ensure base path ends with /
  const cleanBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  
  return `${cleanBasePath}${cleanPath}`;
};

// Configuration object
export const config = {
  tenant: getTenant(),
  basePath: getBasePath(),
  apiUrl: getApiUrl(),
  isDevMode: isDevMode(),
  tenantConfig: getTenantConfig()
};

export default config;
