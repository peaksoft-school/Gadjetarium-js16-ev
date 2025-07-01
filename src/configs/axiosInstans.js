import axios from 'axios'

const BASE_URL = 'http://3.147.74.119/'
// const BASE_URL = 'http://10.10.11.156:8015/'

// const BASE_URL = 'http://192.168.0.121:2025/'

const axiosInstance = axios.create({
   baseURL: BASE_URL,

   headers: {
      'Content-Type': 'application/json',
   },
})
export default axiosInstance

let customStore

export const injectStore = (store) => {
   customStore = store
}

axiosInstance.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }

      // const { token } = customStore.getState()?.auth

      if (true) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpYmVrQGdtYWlsLmNvbSIsImlkIjo1LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTEzNjk1MjIsImV4cCI6MTc1MTM3MzIyMn0.9mayEki5f8_akLJQtQAXSxjdUpXkf_XD82lMlEeryWw`
      }

      return updateConfig
   },

   (error) => {
      return Promise.reject(error)
   }
)

axiosInstance.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },

   (error) => {
      return Promise.reject(error)
   }
)
