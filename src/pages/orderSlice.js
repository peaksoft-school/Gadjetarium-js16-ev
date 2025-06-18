import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../configs/axiosInstans'

export const fetchOrders = createAsyncThunk(
   'orders/fetch',
   async (
      { search, from, to, status, page = 1, pageSize = 10 } = {},
      { rejectWithValue }
   ) => {
      try {
         const params = {}
         if (search) params.search = search
         if (from) params.from = from
         if (to) params.to = to
         if (status) params.status = status
         params.page = page
         params.pageSize = pageSize

         const response = await axiosInstance.get('/api/orders', { params })
         return response.data.content || response.data || []
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Ошибка при получении заказов'
         )
      }
   }
)

export const fetchOrderById = createAsyncThunk(
   'orders/fetchById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/orders/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Ошибка при загрузке заказа'
         )
      }
   }
)

export const updateOrder = createAsyncThunk(
   'orders/update',
   async ({ id, status }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(
            `/api/orders/${id}?status=${status}`
         )
         return { id, status: response.data }
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Ошибка при обновлении заказа'
         )
      }
   }
)

export const deleteOrder = createAsyncThunk(
   'orders/delete',
   async (id, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/orders/${id}`)
         return id
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'Ошибка при удалении')
      }
   }
)

const ordersSlice = createSlice({
   name: 'orders',
   initialState: {
      data: [],

      loading: false,
      error: null,

      selectedOrder: null,
      orderLoading: false,
      orderError: null,
   },
   reducers: {
      clearError: (state) => {
         state.error = null
         state.orderError = null
      },
      clearSelectedOrder: (state) => {
         state.selectedOrder = null
         state.orderLoading = false
         state.orderError = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchOrders.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
         })
         .addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error.message
         })

         .addCase(fetchOrderById.pending, (state) => {
            state.orderLoading = true
            state.orderError = null
            state.selectedOrder = null
         })
         .addCase(fetchOrderById.fulfilled, (state, action) => {
            state.orderLoading = false
            state.selectedOrder = action.payload
         })
         .addCase(fetchOrderById.rejected, (state, action) => {
            state.orderLoading = false
            state.orderError = action.payload || action.error.message
         })

         .addCase(updateOrder.fulfilled, (state, action) => {
            const index = state.data.findIndex(
               (o) => o.id === action.payload.id
            )
            if (index !== -1) {
               state.data[index].status = action.payload.status
            }
            if (state.selectedOrder?.id === action.payload.id) {
               state.selectedOrder.status = action.payload.status
            }
         })

         .addCase(deleteOrder.fulfilled, (state, action) => {
            state.data = state.data.filter(
               (order) => order.id !== action.payload
            )
         })
   },
})

export const { clearError, clearSelectedOrder } = ordersSlice.actions
export default ordersSlice.reducer
