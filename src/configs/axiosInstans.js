import axios from 'axios'

const BASE_URL = 'http://3.147.74.119/'
// const BASE_URL = 'http://10.10.11.156:8015/'

// const BASE_URL = 'http://192.168.0.121:2025'

export const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
})

let customStore

export const injectStore = (store) => {
   customStore = store
}

axiosInstance.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }

      const token = customStore?.getState()?.auth?.token || null

      if (true) {
         updateConfig.headers.Authorization = `Bearer ${token}`
      }

      return updateConfig
   },
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error)
)
