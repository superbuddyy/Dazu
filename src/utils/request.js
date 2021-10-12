import '@/bootstrap';
import { Message } from 'element-ui';
window.axios.defaults.withCredentials = true;
// Create axios instance
const service = window.axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true,
    timeout: 10000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// response pre-processing
service.interceptors.response.use(
    response => {

        if (response.headers.authorization) {
            setLogged(response.headers.authorization);
            response.data.token = response.headers.authorization;
        }

        return response.data;
    },
    error => {
        let message = error.message;
        console.log(message)

        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }

        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export const setAuthHeader = (token) => {
    service.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

setAuthHeader(localStorage.getItem('authtoken'))

export default service;