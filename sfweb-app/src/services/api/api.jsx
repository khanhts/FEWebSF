import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL /*"http://foodioo.camenryder.xyz/api"*/
})