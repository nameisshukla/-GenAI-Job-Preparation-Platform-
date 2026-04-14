import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3000/api',
    withCredentials: true // Important for JWT cookies
});

export const interviewApi = {
    generateReport: async (formData) => {
        const response = await api.post('/interview', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    
    getReport: async (interviewId) => {
        const response = await api.get(`/interview/report/${interviewId}`);
        return response.data;
    },

    downloadResumePdf: async (reportId) => {
        const response = await api.post(`/interview/resume/pdf/${reportId}`, {}, {
            responseType: 'blob'
        });
        return response.data;
    }
};
