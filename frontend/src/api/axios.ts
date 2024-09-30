import axios from 'axios';

export const API_BASE_URL = "http://localhost:3000"

export default axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

