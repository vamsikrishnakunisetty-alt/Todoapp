const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Save token to localStorage
const saveToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Auth API
export const authAPI = {
  signup: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // Save token
    if (data.token) {
      saveToken(data.token);
    }

    return data;
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Save token
    if (data.token) {
      saveToken(data.token);
    }

    return data;
  },

  logout: () => {
    removeToken();
  },

  isAuthenticated: (): boolean => {
    return !!getToken();
  }
};

// Tasks API
export const tasksAPI = {
  getAll: async () => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.error || 'Failed to fetch tasks');
    }

    return data;
  },

  create: async (text: string, dateTime: string) => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text, dateTime })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.error || 'Failed to create task');
    }

    return data;
  },

  update: async (id: string, text: string, dateTime: string) => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text, dateTime })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.error || 'Failed to update task');
    }

    return data;
  },

  toggle: async (id: string) => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.error || 'Failed to toggle task');
    }

    return data;
  },

  delete: async (id: string) => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.error || 'Failed to delete task');
    }

    return data;
  }
};
