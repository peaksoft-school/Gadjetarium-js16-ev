import { createSlice } from '@reduxjs/toolkit'
import { sendPromoMail } from './mailThunk'

const initialState = {
   loading: false,
   success: false,
   error: null,
}

const mailSlice = createSlice({
   name: 'mail',
   initialState,
   reducers: {
      resetMailState: (state) => {
         state.loading = false
         state.success = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(sendPromoMail.pending, (state) => {
            state.loading = true
            state.success = false
            state.error = null
         })
         .addCase(sendPromoMail.fulfilled, (state) => {
            state.loading = false
            state.success = true
         })
         .addCase(sendPromoMail.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
         })
   },
})

export const { resetMailState } = mailSlice.actions
export default mailSlice.reducer
