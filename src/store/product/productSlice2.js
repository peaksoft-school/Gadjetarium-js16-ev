import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts2 } from './productThunk2'

const initialState = {
   sale: [],
   new: [],
   recommend: [],
   loading: false,
   error: null,
}

const productSlice2 = createSlice({
   name: 'product',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts2.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProducts2.fulfilled, (state, action) => {
            state.loading = false
            const products = action.payload || []
            console.log('Received products:', products)
            const total = products.length
            state.sale = products.slice(0, Math.floor(total / 3))
            state.new = products.slice(
               Math.floor(total / 3),
               Math.floor((2 * total) / 3)
            )
            state.recommend = products.slice(Math.floor((2 * total) / 3))
            console.log('State updated:', {
               sale: state.sale,
               new: state.new,
               recommend: state.recommend,
            })
         })
         .addCase(fetchProducts2.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            console.log('Error:', action.payload)
         })
   },
})

export default productSlice2.reducer
