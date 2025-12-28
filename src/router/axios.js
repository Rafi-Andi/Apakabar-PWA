import axios from 'axios'

const api = axios.create({
  baseURL: 'https://6950979f70e1605a1088230b.mockapi.io',
})

api.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

export default api
