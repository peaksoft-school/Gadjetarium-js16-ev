import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchReviewsByStatus = createAsyncThunk(
   'reviews/fetchByStatus',
   async (reviewStatus, { rejectWithValue }) => {
      try {
         const response = await axios.get(`/api/reviews/${reviewStatus}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Something went wrong')
      }
   }
)
