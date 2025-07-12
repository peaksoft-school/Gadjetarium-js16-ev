import axios from 'axios'

// const BASE_URL = 'http://3.147.74.119/'
const BASE_URL = 'http://18.222.84.179'


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
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcGFyb3ZAZ21haWwuY29tIiwiaWQiOjEwMCwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTIzMTA1NDQsImV4cCI6MTc1MjMxNDI0NH0.qfQmDEs-t3kAgm7d0qXEPbTCeN14xCkloJZVVrg-qgc'

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
