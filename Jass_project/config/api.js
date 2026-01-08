export const API = (function () {
    const fromLS = localStorage.getItem("PROOFIT_API_BASE");
    if (fromLS) return fromLS;
    
    const isProduction = window.location.hostname.includes('firebaseapp.com') || 
                         window.location.hostname.includes('web.app');
    
    if (isProduction) {
      return "https://backend-production-6ff4.up.railway.app";
    }
    
    if (window.location.port === "4000") return "";
    return "http://localhost:4000";
  })();
  
  export function getAccessToken() {
    return localStorage.getItem("proofit_access_token");
  }
  
  export function setAccessToken(token) {
    localStorage.setItem("proofit_access_token", token);
  }

  export function removeAccessToken() {
    localStorage.removeItem("proofit_access_token");
  }