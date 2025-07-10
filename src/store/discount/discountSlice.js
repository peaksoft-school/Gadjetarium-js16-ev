import { createSlice } from '@reduxjs/toolkit'
import { addDiscount } from './addDiscountThunk'

const discountSlice = createSlice({
   name: 'discount',
   initialState: {
      loading: false,
      success: false,
      error: null,
   },
   reducers: {
      resetDiscountState: (state) => {
         state.loading = false
         state.success = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(addDiscount.pending, (state) => {
            state.loading = true
            state.success = false
            state.error = null
         })
         .addCase(addDiscount.fulfilled, (state) => {
            state.loading = false
            state.success = true
         })
         .addCase(addDiscount.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Ошибка при добавлении скидки'
         })
   },
})

export const { resetDiscountState } = discountSlice.actions
export default discountSlice.reducer
