import { createSlice } from '@reduxjs/toolkit'
import { fetchOrdersThunk, fetchOrderDetailsThunk } from './orderHistoryThink'

const initialState = {
   orders: [],
   selectedOrder: null,
   loading: false,
   error: null,
}

const orderSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {
      clearSelectedOrder(state) {
         state.selectedOrder = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchOrdersThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.orders = Array.isArray(action.payload) ? action.payload : []
         })
         .addCase(fetchOrdersThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error.message
         })

         .addCase(fetchOrderDetailsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchOrderDetailsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.selectedOrder = action.payload
         })
         .addCase(fetchOrderDetailsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error.message
         })
   },
})

export const { clearSelectedOrder } = orderSlice.actions
export default orderSlice.reducer
