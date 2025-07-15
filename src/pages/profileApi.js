import { axiosInstance } from "../configs/axiosInstans"

export const getUserProfile = async () => {
   const res = await axiosInstance.get('/api/user/profile')
   return res.data
}

export const updateUserProfile = async (data) => {
   const res = await axiosInstance.put('/api/user/update', data)
   return res.data
}

export const uploadUserPhoto = async (file) => {
   const formData = new FormData()
   formData.append('file', file)
   const res = await axiosInstance.post('/api/user/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
   })
   return res.data
}

export const deleteUser = async () => {
   const res = await axiosInstance.delete('/api/user/delete')
   return res.data
}
