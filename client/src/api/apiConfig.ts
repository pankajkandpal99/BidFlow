import { API_BASE_URL } from "../config/config";

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  USER: {
    CURRENT_USER: `${API_BASE_URL}/api/v1/user/current`,
    PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/v1/users/update`,
  },
  BIDS: {
    BASE: `${API_BASE_URL}/api/v1/bids`,
    ALL: `${API_BASE_URL}/api/v1/bids`,
    CREATE: `${API_BASE_URL}/api/v1/bids`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/v1/bids/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/v1/bids/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/v1/bids/${id}`,
  },
  CONTRACTS: {
    BASE: `${API_BASE_URL}/api/v1/contracts`,
    ALL: `${API_BASE_URL}/api/v1/contracts`,
    CREATE: `${API_BASE_URL}/api/v1/contracts`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/v1/contracts/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/v1/contracts/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/v1/contracts/${id}`,
  },
  ADMIN: {
    UPLOAD_IMAGE: `${API_BASE_URL}/api/v1/upload-image`,
  },
};

export { API_ENDPOINTS };
