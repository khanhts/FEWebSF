import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const ADMIN_URL = `${BASE_URL}/admin`;

export const api = axios.create({
    baseURL: BASE_URL
})

export const admin_api = axios.create({
    baseURL: ADMIN_URL
})
