import axios from 'axios'

const BASE_URL = 'http://3.147.74.119'

export const fileUploadInstance = axios.create({
   baseURL: BASE_URL,
   headers: {},
})

fileUploadInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)
