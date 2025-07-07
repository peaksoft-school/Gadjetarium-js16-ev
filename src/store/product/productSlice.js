import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './productThunk'

const initialState = {
   sale: [],
   new: [],
   recommend: [],
   loading: false,
   error: null,
}

const productSlice = createSlice({
   name: 'products',
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
            const products = action.payload

            state.sale = products.filter((p) => p.productTypeId === 1)
            state.new = products.filter((p) => p.productTypeId === 2)
            state.recommend = products.filter((p) => p.productTypeId === 3)
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default productSlice.reducer
