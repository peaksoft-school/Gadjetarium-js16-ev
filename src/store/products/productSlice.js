import { createSlice } from '@reduxjs/toolkit'
import {
   fetchProducts,
   deleteProduct,
   fetchProductById,
   saveProduct,
} from './productThunk'

const initialState = {
   items: [],
   total: 0,
   loading: false,
   error: null,

   selectedProduct: null,
   selectedLoading: false,
   selectedError: null,

   saveLoading: false,
   saveError: null,
   saveSuccess: false,
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
         // saveProduct
         .addCase(saveProduct.pending, (state) => {
            state.saveLoading = true
            state.saveError = null
            state.saveSuccess = false
         })
         .addCase(saveProduct.fulfilled, (state, action) => {
            state.saveLoading = false
            state.saveSuccess = true
            // Можно добавить в items, если нужно:
            // state.items.push(action.payload)
         })
         .addCase(saveProduct.rejected, (state, action) => {
            state.saveLoading = false
            state.saveError = action.payload
            state.saveSuccess = false
         })
   },
})

export default productSlice.reducer
