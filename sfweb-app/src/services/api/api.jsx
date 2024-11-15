import axios from 'axios'

export const api = axios.create({
    baseURL: "http://foodioo.camenryder.xyz/api"
})