const API_BASE = 'http://localhost:5000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('keja_token');
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

export const api = {
  // Auth
  signup: (userData) => request('/auth/signup', {
    method: 'POST',
    body: userData,
  }),

  login: (email, password, role) => request('/auth/login', {
    method: 'POST',
    body: { email, password, role },
  }),

  getMe: () => request('/auth/me'),

  // Properties
  getListings: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '' && filters[key] !== 'All Cities' && filters[key] !== 'All Types') {
        params.append(key, filters[key]);
      }
    });
    const queryString = params.toString();
    const result = await request(`/properties${queryString ? `?${queryString}` : ''}`);
    if (result.success && Array.isArray(result.properties)) {
      result.properties = result.properties.map(p => ({
        ...p,
        id: p._id,
        img: p.imgUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80',
      }));
    }
    return result;
  },

  createListing: async (listingData) => {
    const payload = {
      ...listingData,
      imgUrl: listingData.img || '',
    };
    delete payload.img;
    const result = await request('/properties', {
      method: 'POST',
      body: payload,
    });
    if (result.success && result.property) {
      result.property = {
        ...result.property,
        id: result.property._id,
        img: result.property.imgUrl,
      };
    }
    return result;
  },

  deleteListing: (id) => request(`/properties/${id}`, {
    method: 'DELETE',
  }),

  // Payments
  verifyMpesa: (mpesaCode) => request('/payments/verify', {
    method: 'POST',
    body: { mpesaCode },
  }),

  // Tenant Lifecycle
  markHouseFound: () => request('/tenant/house-found', {
    method: 'POST',
  }),

  resetSearch: () => request('/tenant/reset-search', {
    method: 'POST',
  }),
};
