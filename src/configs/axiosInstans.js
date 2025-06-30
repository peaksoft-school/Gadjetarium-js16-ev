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
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRha2FiYWV2YWRpczIwMDlAZ21haWwuY29tIiwiaWQiOjYsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzUxMjk3ODA4LCJleHAiOjE3NTEzMDE1MDh9.lH2JEj1ZAVQQ5DxqnAfrWfuykbjes2YSnOrNHu8MdN0`
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
