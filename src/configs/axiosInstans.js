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
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRha2FiYWV2YWRpczIwMDlAZ21haWwuY29tIiwiaWQiOjYsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzUxMzc0MjU1LCJleHAiOjE3NTEzNzc5NTV9.0jA_rZxNGy62eGEnfb--orHbiKyi55h9XckSmMWH27k`
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
