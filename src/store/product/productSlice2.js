// import { createSlice } from '@reduxjs/toolkit'
// import { fetchProducts2 } from './productThunk2'

// const initialState = {
//    sale: [],
//    new: [],
//    recommend: [],
//    loading: false,
//    error: null,
// }

// const productSlice2 = createSlice({
//    name: 'product',
//    initialState,
//    reducers: {},
//    extraReducers: (builder) => {
//       builder
//          .addCase(fetchProducts2.pending, (state) => {
//             state.loading = true
//             state.error = null
//          })
//          .addCase(fetchProducts2.fulfilled, (state, action) => {
//             state.loading = false
//             const products = action.payload || []
//             console.log('Received products:', products)
//             const total = products.length
//             state.sale = products.slice(0, Math.floor(total / 3))
//             state.new = products.slice(
//                Math.floor(total / 3),
//                Math.floor((2 * total) / 3)
//             )
//             state.recommend = products.slice(Math.floor((2 * total) / 3))
//             console.log('State updated:', {
//                sale: state.sale,
//                new: state.new,
//                recommend: state.recommend,
//             })
//          })
//          .addCase(fetchProducts2.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.payload
//             console.log('Error:', action.payload)
//          })
//    },
// })

// export default productSlice2.reducer

import { createSlice } from '@reduxjs/toolkit'
import {
   fetchProducts2,
   fetchProductDetail,
   fetchFilteredProducts,
} from './productThunk2'

const initialState = {
   sale: [],
   new: [],
   recommend: [],
   selectedProduct: null,
   loading: false,
   error: null,
}

const productSlice2 = createSlice({
   name: 'products',
   initialState,
   reducers: {
      clearSelectedProduct: (state) => {
         state.selectedProduct = null
      },
      toggleProductLikeLocally: (state, action) => {
         const { productTypeId } = action.payload
         ;['sale', 'new', 'recommend'].forEach((key) => {
            if (Array.isArray(state[key])) {
               state[key] = state[key].map((product) =>
                  product.productTypeId === productTypeId
                     ? { ...product, isLiked: !product.isLiked }
                     : product
               )
            }
         })
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts2.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProducts2.fulfilled, (state, action) => {
            state.loading = false
            let products = []
            if (Array.isArray(action.payload)) {
               products = action.payload
            } else if (action.payload && Array.isArray(action.payload.products)) {
               products = action.payload.products
            }
            products = products.slice().sort((a, b) => a.id - b.id)
            const status = action.meta.arg.status
            if (status === 'акции') state.sale = products
            else if (status === 'новинки') state.new = products
            else if (status === 'мы рекомендуем') state.recommend = products
         })
         .addCase(fetchProducts2.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // --- фильтрация ---
         .addCase(fetchFilteredProducts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
            state.loading = false
            const products = action.payload?.data || []
            const status = action.payload?.status || action.meta.arg.status
            if (status === 'акции') state.sale = products
            else if (status === 'новинки') state.new = products
            else if (status === 'мы рекомендуем') state.recommend = products
         })
         .addCase(fetchFilteredProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchProductDetail.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.loading = false
            state.selectedProduct = action.payload ?? null
         })
         .addCase(fetchProductDetail.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { clearSelectedProduct, toggleProductLikeLocally } =
   productSlice2.actions
export default productSlice2.reducer
