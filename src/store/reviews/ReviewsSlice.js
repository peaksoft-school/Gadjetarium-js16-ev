import { createSlice } from '@reduxjs/toolkit'
import {
   fetchReviewsByStatus,
   updateReviewResponse,
   addReview,
   saveReviewResponse,
   postReviewResponse,
   deleteReview,
} from './ReviewsThunk'

const reviewsSlice = createSlice({
   name: 'reviews',
   initialState: {
      items: [],
      status: 'idle',
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchReviewsByStatus.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchReviewsByStatus.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
         })
         .addCase(fetchReviewsByStatus.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
         })
         .addCase(updateReviewResponse.fulfilled, (state, action) => {
            const index = state.items.findIndex(
               (item) => item.id === action.payload.id
            )
            if (index !== -1) state.items[index] = action.payload
         })
         .addCase(addReview.fulfilled, (state, action) => {
            state.items.push(action.payload)
         })
         .addCase(saveReviewResponse.fulfilled, (state, action) => {
            const index = state.items.findIndex(
               (item) => item.id === action.payload.id
            )
            if (index !== -1) state.items[index] = action.payload
         })
         .addCase(postReviewResponse.fulfilled, (state, action) => {
            const index = state.items.findIndex(
               (item) => item.id === action.payload.id
            )
            if (index !== -1) state.items[index] = action.payload
         })
         .addCase(deleteReview.fulfilled, (state, action) => {
            const reviewId = action.meta.arg
            state.items = state.items.filter((item) => item.id !== reviewId)
         })
         .addCase(deleteReview.rejected, (state, action) => {
            state.error = action.payload
         })
   },
})

export default reviewsSlice.reducer

////////

// import { createSlice } from '@reduxjs/toolkit'
// import { fetchReviewsByProductId } from './ReviewsThunk'

// const reviewsSlice = createSlice({
//    name: 'reviews',
//    initialState: {
//       items: [],
//       status: 'idle',
//       error: null,
//    },
//    reducers: {},
//    extraReducers: (builder) => {
//       builder
//          .addCase(fetchReviewsByProductId.pending, (state) => {
//             state.status = 'loading'
//          })
//          .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
//             state.status = 'succeeded'
//             state.items = action.payload
//          })
//          .addCase(fetchReviewsByProductId.rejected, (state, action) => {
//             state.status = 'failed'
//             state.error = action.payload
//          })
//    },
// })

// export default reviewsSlice.reducer
