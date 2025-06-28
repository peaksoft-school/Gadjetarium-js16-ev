import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../configs/axiosInstans'

export const fetchReviewsByStatus = createAsyncThunk(
   'reviews/fetchByStatus',
   async (reviewStatus = 'все', { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/reviews/${reviewStatus}`
         )
         return response.data
      } catch (error) {
         const message = error.response?.data?.message || error.message
         return rejectWithValue(message)
      }
   }
)

export const updateReviewResponse = createAsyncThunk(
   'reviews/updateResponse',
   async ({ reviewId, response }, { dispatch, rejectWithValue }) => {
      try {
         const body = { reviewId, response }
         const res = await axiosInstance.put(`/api/reviews/response`, body)
         return res.data
      } catch (error) {
         const message = error.response?.data?.message || error.message
         return rejectWithValue(message)
      } finally {
         dispatch(fetchReviewsByStatus('все'))
      }
   }
)

export const addReview = createAsyncThunk(
   'reviews/addReview',
   async (reviewData, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/reviews', reviewData)
         return response.data
      } catch (error) {
         const message = error.response?.data?.message || error.message
         return rejectWithValue(message)
      }
   }
)

export const saveReviewResponse = createAsyncThunk(
   'reviews/saveReviewResponse',
   async ({ reviewId, response }, { dispatch, rejectWithValue }) => {
      try {
         const res = await axiosInstance.post(
            `/api/reviews/save/${reviewId}`,
            null,
            {
               params: { response },
            }
         )
         return res.data
      } catch (error) {
         const message = error.response?.data?.message || error.message
         return rejectWithValue(message)
      } finally {
         dispatch(fetchReviewsByStatus('все'))
      }
   }
)

export const postReviewResponse = createAsyncThunk(
   'reviews/postReviewResponse',
   async ({ reviewId, response }, { dispatch, rejectWithValue }) => {
      try {
         const res = await axiosInstance.post(
            `/api/reviews/save/${reviewId}`,
            null,
            {
               params: { response },
            }
         )
         return res.data
      } catch (error) {
         const message = error.response?.data?.message || error.message
         return rejectWithValue(message)
      } finally {
         dispatch(fetchReviewsByStatus('все'))
      }
   }
)

export const deleteReview = createAsyncThunk(
   'reviews/deleteReview',
   async (reviewId, { dispatch, rejectWithValue }) => {
      try {
         if (!reviewId) {
            throw new Error('Review ID is undefined')
         }
         const res = await axiosInstance.delete(
            `/api/reviews/delete/${reviewId}`
         )
         if (res.status === 200) {
            console.log(`Review ${reviewId} deleted successfully`)
         }
         return res.data
      } catch (error) {
         const message = error.response?.data?.message || error.message
         console.error('Delete failed:', message)
         return rejectWithValue(message)
      } finally {
         const status = dispatch(fetchReviewsByStatus('все'))
         if (status.error) console.error('Refresh failed:', status.error)
      }
   }
)
