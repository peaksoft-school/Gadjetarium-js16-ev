import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const sendPromoMail = createAsyncThunk(
   'mail/sendPromoMail',
   async ({ file, subject, message, promoEndDate }, thunkAPI) => {
      try {
         // 1. Загрузка изображения в S3
         const formData = new FormData()
         formData.append('file', file)

         const uploadRes = await axiosInstance.post('/api/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })

         const imageUrl = uploadRes.data // строка, а не объект

         // 2. Отправка письма
         const res = await axiosInstance.post('/api/mail/send', {
            image: imageUrl,
            subject,
            message,
            promoEndDate,
         })

         return res.data
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data || 'Ошибка при отправке письма'
         )
      }
   }
)
