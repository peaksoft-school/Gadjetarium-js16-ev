import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'
import { signInWithGoogle } from '../../configs/firebase'
import { showToast } from '../../utils/helpers/showToast'

const getErrorMessage = (error, defaultMessage) => {
   const data = error.response?.data
   if (typeof data === 'string') return { message: data }
   if (typeof data === 'object' && data?.message)
      return { message: data.message }
   return { message: defaultMessage }
}

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

            showToast({ message: 'Успешный вход!' })

            if (handleClose) handleClose()
            if (navigate) navigate('/')

            return { token, email, role }
         } catch (error) {
            const err = getErrorMessage(error, 'Ошибка входа')
            showToast({ message: err.message, type: 'error' })
            return rejectWithValue(err)
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

            showToast({ message: 'Регистрация прошла успешно!' })

            if (navigate) navigate('/')

            return { token, email, role }
         } catch (error) {
            const err = getErrorMessage(error, 'Ошибка регистрации')
            showToast({ message: err.message, type: 'error' })
            return rejectWithValue(err)
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

            showToast({ message: 'Инструкции отправлены на почту' })

            if (navigate) navigate('/sign-in')
            return { success: true }
         } catch (error) {
            const err = getErrorMessage(error, 'Ошибка отправки инструкций')
            showToast({ message: err.message, type: 'error' })
            return rejectWithValue(err)
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

            showToast({ message: 'Пароль успешно сброшен!' })

            if (navigate) navigate('/login')
            return { success: true }
         } catch (error) {
            const err = getErrorMessage(error, 'Ошибка сброса пароля')
            showToast({ message: err.message, type: 'error' })
            return rejectWithValue(err)
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

            showToast({ message: 'Успешный вход через Google' })

            if (navigate) navigate('/')
            return { token, email, role }
         } catch (error) {
            const err = getErrorMessage(error, 'Ошибка входа через Google')
            showToast({ message: err.message, type: 'error' })
            return rejectWithValue(err)
         }
      }
   ),
}
