import { createSlice } from '@reduxjs/toolkit'
import { AUTH_THUNK } from './authThunk'

const initialState = {
   token: null,
   email: null,
   role: 'GUEST',
   isAuth: false,
   isLoading: false,
   error: null,
   forgotPasswordSuccess: false,
   resetPasswordSuccess: false,
   googleLoading: false,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut(state) {
         state.token = null
         state.email = null
         state.role = 'GUEST'
         state.isAuth = false
         localStorage.clear()
      },
      resetForgotPasswordState(state) {
         state.forgotPasswordSuccess = false
         state.error = null
      },
      resetPasswordState(state) {
         state.resetPasswordSuccess = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(AUTH_THUNK.signIn.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(AUTH_THUNK.signIn.fulfilled, (state, action) => {
            Object.assign(state, {
               ...action.payload,
               isAuth: true,
               isLoading: false,
            })
         })
         .addCase(AUTH_THUNK.signIn.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload.message
         })

         .addCase(AUTH_THUNK.signUp.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(AUTH_THUNK.signUp.fulfilled, (state, action) => {
            Object.assign(state, {
               ...action.payload,
               isAuth: true,
               isLoading: false,
            })
         })
         .addCase(AUTH_THUNK.signUp.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload.message
         })

         .addCase(AUTH_THUNK.forgotPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.forgotPasswordSuccess = false
         })
         .addCase(AUTH_THUNK.forgotPassword.fulfilled, (state) => {
            state.isLoading = false
            state.forgotPasswordSuccess = true
         })
         .addCase(AUTH_THUNK.forgotPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload.message
            state.forgotPasswordSuccess = false
         })

         .addCase(AUTH_THUNK.resetPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.resetPasswordSuccess = false
         })
         .addCase(AUTH_THUNK.resetPassword.fulfilled, (state) => {
            state.isLoading = false
            state.resetPasswordSuccess = true
         })
         .addCase(AUTH_THUNK.resetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload.message
            state.resetPasswordSuccess = false
         })

         .addCase(AUTH_THUNK.googleSignIn.pending, (state) => {
            state.googleLoading = true
            state.error = null
         })
         .addCase(AUTH_THUNK.googleSignIn.fulfilled, (state, action) => {
            state.googleLoading = false
            Object.assign(state, {
               ...action.payload,
               isAuth: true,
            })
         })
         .addCase(AUTH_THUNK.googleSignIn.rejected, (state, action) => {
            state.googleLoading = false
            state.error = action.payload.message
         })
   },
})

export const { logOut, resetForgotPasswordState, resetPasswordState } =
   authSlice.actions
export const authReducer = authSlice.reducer
