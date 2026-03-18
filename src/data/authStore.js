const AUTH_STORAGE_KEY = "admin_auth_session_v1";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function isAuthenticated() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function loginAdmin({ username, password }) {
  const normalizedUsername = String(username || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");
  const isValid = normalizedUsername === ADMIN_USERNAME && normalizedPassword === ADMIN_PASSWORD;

  if (isValid && canUseStorage()) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
  }

  return isValid;
}

export function logoutAdmin() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getLoginHint() {
  return {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  };
}
