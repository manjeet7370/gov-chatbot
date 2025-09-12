// src/config.ts
export const API_BASE_URL = "http://127.0.0.1:8000/api";

export const authHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
