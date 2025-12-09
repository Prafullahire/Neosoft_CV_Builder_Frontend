// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    CV: {
        GET: (id) => `${API_BASE_URL}/api/cvs/${id}`,
        CREATE: `${API_BASE_URL}/api/cvs`,
        UPDATE: (id) => `${API_BASE_URL}/api/cvs/${id}`,
    },
};

export default API_BASE_URL;
