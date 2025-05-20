// store/slices/auth/authThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const AUTH_THUNK = {
   signIn: createAsyncThunk(
      'auth/signIn',
      async (
         { values, navigate, setSubmitting, handleClose },
         { rejectWithValue }
      ) => {
         try {
            const response = await axiosInstance.post(
               '/api/auth/sign-in',
               values
            )
            const { token, email, role } = response.data

            localStorage.setItem('TOKEN', token)

            if (handleClose) handleClose()
            if (navigate) navigate('/')

            return { token, email, role }
         } catch (error) {
            return rejectWithValue(
               error.response?.data || { message: 'Ошибка входа' }
            )
         } finally {
            setSubmitting(false)
         }
      }
   ),

   signUp: createAsyncThunk(
      'auth/signUp',
      async ({ values, navigate, setSubmitting }, { rejectWithValue }) => {
         try {
            const response = await axiosInstance.post(
               '/api/auth/sign-up',
               values
            )
            const { token, email, role } = response.data

            localStorage.setItem('TOKEN', token)

            if (navigate) navigate('/')

            return { token, email, role }
         } catch (error) {
            return rejectWithValue(
               error.response?.data || { message: 'Ошибка регистрации' }
            )
         } finally {
            setSubmitting(false)
         }
      }
   ),

   forgotPassword: createAsyncThunk(
      'auth/forgotPassword',
      async ({ email, navigate, setSubmitting }, { rejectWithValue }) => {
         try {
            await axiosInstance.post('/api/auth/forgot-password', null, {
               params: { email },
            })

            if (navigate) navigate('/check-email')
            return { success: true }
         } catch (error) {
            return rejectWithValue(
               error.response?.data || { message: 'Ошибка отправки инструкций' }
            )
         } finally {
            if (setSubmitting) setSubmitting(false)
         }
      }
   ),

   resetPassword: createAsyncThunk(
      'auth/resetPassword',
      async (
         { token, password, navigate, setSubmitting },
         { rejectWithValue }
      ) => {
         try {
            await axiosInstance.post('/api/auth/reset-password', null, {
               params: { token, password },
            })

            if (navigate) navigate('/login')
            return { success: true }
         } catch (error) {
            return rejectWithValue(
               error.response?.data || { message: 'Ошибка сброса пароля' }
            )
         } finally {
            if (setSubmitting) setSubmitting(false)
         }
      }
   ),
   googleSignIn: createAsyncThunk(
      'auth/googleSignIn',
      async ({ navigate }, { rejectWithValue }) => {
         try {
            const { idToken, email } = await signInWithGoogle()
            const response = await axiosInstance.post(
               '/api/auth/google',
               null,
               {
                  params: { idToken },
               }
            )
            const { token, role } = response.data
            localStorage.setItem('TOKEN', token)
            if (navigate) navigate('/')
            return { token, email, role }
         } catch (error) {
            return rejectWithValue(
               error.response?.data || { message: error.message }
            )
         }
      }
   ),
}
