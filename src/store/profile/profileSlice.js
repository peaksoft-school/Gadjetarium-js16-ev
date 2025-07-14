import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   getUserProfile,
   updateUserProfile,
   uploadUserPhoto,
   deleteUser,
} from '../../pages/profileApi'

export const fetchProfile = createAsyncThunk('profile/fetch', getUserProfile)

export const updateProfile = createAsyncThunk(
   'profile/update',
   async (data) => await updateUserProfile(data)
)

export const uploadPhoto = createAsyncThunk(
   'profile/uploadPhoto',
   async (file) => await uploadUserPhoto(file)
)

export const deleteProfile = createAsyncThunk('profile/delete', deleteUser)

const profileSlice = createSlice({
   name: 'profile',
   initialState: {
      data: null,
      status: 'idle',
      error: null,
      photoStatus: 'idle',
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProfile.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchProfile.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
         })
         .addCase(fetchProfile.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })

         .addCase(updateProfile.pending, (state) => {
            state.status = 'updating'
         })
         .addCase(updateProfile.fulfilled, (state, action) => {
            state.status = 'updated'
            state.data = action.payload
         })
         .addCase(updateProfile.rejected, (state, action) => {
            state.status = 'update_failed'
            state.error = action.error.message
         })

         .addCase(uploadPhoto.pending, (state) => {
            state.photoStatus = 'uploading'
         })
         .addCase(uploadPhoto.fulfilled, (state, action) => {
            state.photoStatus = 'uploaded'
            if (state.data) state.data.photoUrl = action.payload?.photoUrl
         })
         .addCase(uploadPhoto.rejected, (state, action) => {
            state.photoStatus = 'upload_failed'
            state.error = action.error.message
         })

         .addCase(deleteProfile.fulfilled, (state) => {
            state.data = null
            state.status = 'deleted'
         })
   },
})

export default profileSlice.reducer
