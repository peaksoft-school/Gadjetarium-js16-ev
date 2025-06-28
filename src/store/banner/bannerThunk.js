import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'
import { fileUploadInstance } from '../../configs/fileAxiosInstance'

export const postBanner = createAsyncThunk(
   'banner/postBanner',
   async (files, thunkAPI) => {
      try {
         const uploadedUrls = []

         for (const file of files) {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fileUploadInstance.post(
               '/api/files/upload',
               formData
            )

            uploadedUrls.push(res.data)
         }

         const bannerRes = await axiosInstance.post('/api/banner/new', {
            images: uploadedUrls,
         })

         return bannerRes.data
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data || 'Ошибка при загрузке баннера'
         )
      }
   }
)
