import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts, deleteProduct, fetchProductById } from './productThunk'

const initialState = {
   items: [],
   total: 0,
   loading: false,
   error: null,

   selectedProduct: null,
   selectedLoading: false,
   selectedError: null,
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
            state.items = action.payload.data
            state.total = action.payload.total
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteProduct.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.items = state.items.filter(
               (item) => item.id !== action.meta.arg
            )
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchProductById.pending, (state) => {
            state.selectedLoading = true
            state.selectedError = null
         })
         .addCase(fetchProductById.fulfilled, (state, action) => {
            state.selectedLoading = false
            state.selectedProduct = action.payload
            state.selectedError = null
         })
         .addCase(fetchProductById.rejected, (state, action) => {
            state.selectedLoading = false
            state.selectedError = action.payload
         })
   },
})

export default productSlice.reducer
