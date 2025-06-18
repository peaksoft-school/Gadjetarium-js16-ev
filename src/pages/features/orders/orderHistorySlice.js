import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderHistory } from './orderHistoryThink';

const orderHistorySlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.sort((a, b) => a.id - b.id);
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderHistorySlice.reducer;
