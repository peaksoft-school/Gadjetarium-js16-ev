import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './productThunk'

const initialState = {
   items: [],
   loading: false,
   error: null,
}

const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default productSlice.reducer
