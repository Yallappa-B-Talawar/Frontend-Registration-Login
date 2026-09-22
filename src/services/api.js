/**
 * RegLog Centralized API Client
 *
 * Configured with credentials: 'include' so that HttpOnly session cookies
 * are automatically sent with all requests and received on login/logout.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Mandates HttpOnly cookie transmission
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, config);
  } catch (err) {
    throw new Error(
      'Unable to connect to the backend server. If using Render free tier, please wait 30–50 seconds while the backend server wakes up and try again.'
    );
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    let msg = 'API Request Failed';
    if (data) {
      if (typeof data === 'string' && data.trim()) {
        msg = data;
      } else if (typeof data.message === 'string' && data.message.trim()) {
        msg = data.message;
      } else if (typeof data.error === 'string' && data.error.trim()) {
        msg = data.error;
      } else if (data.message && typeof data.message === 'object' && typeof data.message.message === 'string') {
        msg = data.message.message;
      } else if (data.error && typeof data.error === 'object' && typeof data.error.message === 'string') {
        msg = data.error.message;
      } else {
        msg = response.statusText || `Request failed with status ${response.status}`;
      }
    } else if (response.statusText) {
      msg = response.statusText;
    }

    const error = new Error(msg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  /**
   * Register a new user
   * POST /api/reg
   */
  register: (userData) => {
    return request('/api/reg', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Authenticate user & receive HttpOnly cookie
   * POST /api/login
   */
  login: (credentials) => {
    return request('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Invalidate session & clear HttpOnly cookie
   * POST /api/logout
   */
  logout: () => {
    return request('/api/logout', {
      method: 'POST',
    });
  },

  /**
   * Fetch authenticated user identity
   * GET /api/user/me
   */
  getCurrentUser: () => {
    return request('/api/user/me', {
      method: 'GET',
    });
  },
};
