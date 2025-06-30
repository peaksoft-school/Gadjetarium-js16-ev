import axios from 'axios'

const BASE_URL = 'http://3.147.74.119'

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

      // const token = customStore?.getState()?.auth?.token || null

      const token =
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpYmVrQGdtYWlsLmNvbSIsImlkIjo1LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTExMjA5ODIsImV4cCI6MTc1MTEyNDY4Mn0.M1h8KvDffEF1IeNQ-YiJsLqxTbrduzTdJgqpGnQKP80'

      if (token) {
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
