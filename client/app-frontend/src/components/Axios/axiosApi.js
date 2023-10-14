import axios from 'axios';

export const registroApi = axios.create({
    baseURL: 'http://localhost:3001/api/admin',
});

export const loginApi = axios.create({
    baseURL: 'http://localhost:3001/api/login',
});

export const logoutApi = axios.create({
    baseURL: 'http://localhost:3001/api/logout',
});

export const apiRoute = axios.create({
    baseURL: 'http://localhost:3001/api',
});