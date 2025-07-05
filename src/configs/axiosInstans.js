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
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcGFyb3ZAZ21haWwuY29tIiwiaWQiOjEwMSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTE3MTM0NDIsImV4cCI6MTc1MTcxNzE0Mn0._n5unVMWlQFrwXbDEuU9Lr2TuL_wKvCjKC9hKiUuiWg'

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
