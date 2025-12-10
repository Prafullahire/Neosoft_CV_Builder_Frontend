import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/cvs` : 'http://localhost:5000/api/cvs';

const getAuthConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };
};

// Create new CV
export const createCV = async (cvData) => {
    const response = await axios.post(API_URL, cvData, getAuthConfig());
    return response.data;
};

// Get all CVs for user
export const getCVs = async () => {
    const response = await axios.get(API_URL, getAuthConfig());
    return response.data;
};

// Get single CV
export const getCVById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
};

// Update CV
export const updateCV = async (id, cvData) => {
    const response = await axios.put(`${API_URL}/${id}`, cvData, getAuthConfig());
    return response.data;
};

// Delete CV
export const deleteCV = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
};

// Get public CV
export const getPublicCV = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/public/${id}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            const message = err.response.data?.message || err.response.statusText || 'Server error';
            const error = new Error(message);
            error.status = err.response.status;
            throw error;
        }
        // Network or other error
        throw new Error(err.message || 'Network error');
    }
};

const cvService = {
    createCV,
    getCVs,
    getCVById,
    updateCV,
    deleteCV,
    getPublicCV,
};

export default cvService;
