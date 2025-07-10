import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchInfographic = createAsyncThunk(
   'infographic/fetchInfographic',
   async (period = 'daily', { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/infographic?period=${period}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

const infographicSlice = createSlice({
   name: 'infographic',
   initialState: {
      data: null,
      status: 'idle',
      error: null,
      period: 'daily',
   },
   reducers: {
      setPeriod(state, action) {
         state.period = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchInfographic.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchInfographic.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
         })
         .addCase(fetchInfographic.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
         })
   },
})

export const { setPeriod } = infographicSlice.actions
export default infographicSlice.reducer
