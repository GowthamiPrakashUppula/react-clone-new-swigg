import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./iframe.css";
import { BrowserRouter } from "react-router-dom";
import { getBasePath } from "./config.js";
import { configureIframe, isInIframe } from "./iframe.js";

// Get base path from configuration
const basename = getBasePath();

// Configure iframe handling if running inside iframe
configureIframe();

// Add iframe class to html element for styling
if (isInIframe()) {
  document.documentElement.classList.add('in-iframe');
  document.body.classList.add('in-iframe');
  
  // Add dev mode indicator in development
  if (import.meta.env.DEV) {
    document.documentElement.classList.add('dev-mode');
  }
}

// Log context for debugging
if (import.meta.env.DEV) {
  console.log('CAM Application Starting:', {
    basename,
    isInIframe: isInIframe(),
    location: window.location.href
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
