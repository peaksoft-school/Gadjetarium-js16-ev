import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'
import { fileUploadInstance } from '../../configs/fileAxiosInstance'

export const sendPromoMail = createAsyncThunk(
   'mail/postMail',
   async (mailData, thunkAPI) => {
      try {
         const uploadedUrls = []

         for (const file of mailData.files) {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fileUploadInstance.post(
               '/api/files/upload',
               formData
            )

            uploadedUrls.push(res.data)
         }

         const mailRes = await axiosInstance.post('/api/mail/send', {
            subject: mailData.subject,
            message: mailData.text,
            images: uploadedUrls,
            promoEndDate: mailData.promoEndDate,
         })

         return mailRes.data
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data || 'Ошибка при отправке письма'
         )
      }
   }
)
