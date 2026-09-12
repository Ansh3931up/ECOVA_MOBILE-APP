import axios from 'axios';
import { toast } from 'react-hot-toast';


import { refreshToken } from '../Redux/userRedux';
import {store} from '../app/store';


const BASEURL="https://ecova-mobile-app.onrender.com/api/v1";


const axiosInstance=axios.create();



axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await store.dispatch(refreshToken());
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                toast.error("Session expired. Please log in again.");
                store.dispatch(clearUserData()); // Clear user data on refresh token failure
                window.location.href = '/signin'; // Redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
