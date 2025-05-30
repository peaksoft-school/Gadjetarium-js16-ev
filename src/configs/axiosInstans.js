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

      const { token } = customStore.getState()?.auth

      if (token) {
         updateConfig.headers.Authorization = `Bearer ${token}`
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

import axios from 'axios'

const axiosInstance = axios.create({
   baseURL, // Replace with your actual API base URL
   headers: {
      'Content-Type': 'application/json',
      // Add authentication headers if needed (e.g., Authorization: `Bearer ${token}`)
   },
})

export default axiosInstance
