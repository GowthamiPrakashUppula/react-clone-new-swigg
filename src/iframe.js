/**
 * Iframe detection and handling utilities
 */

// Check if application is running inside an iframe
export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    // If we can't access window.top due to cross-origin restrictions, we're in an iframe
    return true;
  }
};

// Get parent window origin (safely)
export const getParentOrigin = () => {
  try {
    if (isInIframe() && document.referrer) {
      return new URL(document.referrer).origin;
    }
  } catch (e) {
    console.warn('Unable to detect parent origin:', e);
  }
  return null;
};

// Send message to parent window
export const sendToParent = (message, targetOrigin = '*') => {
  if (isInIframe() && window.parent) {
    try {
      window.parent.postMessage(message, targetOrigin);
    } catch (e) {
      console.error('Failed to send message to parent:', e);
    }
  }
};

// Listen for messages from parent window
export const listenToParent = (callback, allowedOrigins = null) => {
  const handler = (event) => {
    // TODO: In production, enable origin validation for security
    // Example: allowedOrigins = ['https://enterprise-uat.proximus.be', 'https://enterprise.proximus.be']
    if (allowedOrigins && !allowedOrigins.includes(event.origin)) {
      console.warn('Rejected message from unauthorized origin:', event.origin);
      return;
    }
    callback(event.data, event.origin);
  };
  
  window.addEventListener('message', handler);
  
  // Return cleanup function
  return () => window.removeEventListener('message', handler);
};

// Notify parent that iframe is ready
export const notifyIframeReady = () => {
  sendToParent({
    type: 'CAM_IFRAME_READY',
    timestamp: Date.now(),
    url: window.location.href
  });
};

// Configure iframe-specific settings
export const configureIframe = () => {
  if (isInIframe()) {
    // Allow forms to submit in iframe
    document.addEventListener('DOMContentLoaded', () => {
      // Add any iframe-specific initialization here
      notifyIframeReady();
    });
  }
};

export default {
  isInIframe,
  getParentOrigin,
  sendToParent,
  listenToParent,
  notifyIframeReady,
  configureIframe
};
