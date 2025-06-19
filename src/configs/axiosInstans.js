import axios from 'axios'

const BASE_URL = 'http://3.147.74.119'
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

      const token = customStore.getState()?.auth?.token || null

      if (token) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpYmVrQGdtYWlsLmNvbSIsImlkIjo1LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTAyNDAxMTEsImV4cCI6MTc1MDI0MzgxMX0.zI-5BahAau40Fqu4WRJ-TeLaptIoiSyGy2NL8Wah9F4 `
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
