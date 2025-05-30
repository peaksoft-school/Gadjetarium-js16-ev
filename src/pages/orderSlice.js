import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../configs/axiosInstans'

export const fetchOrders = createAsyncThunk(
   'orders/fetch',
   async ({ search, from, to, status, page = 1, pageSize = 10 } = {}) => {
      try {
         const params = {}
         
         if (search) params.search = search
         if (from) params.from = from
         if (to) params.to = to
         if (status) params.status = status
         params.page = page
         params.pageSize = pageSize

         console.log('Отправляем запрос с параметрами:', params)

         const response = await axiosInstance.get('/api/orders', { params })
         
         console.log('Ответ от сервера:', response.data)
         
         return response.data.content || response.data || []
      } catch (error) {
         console.error('Ошибка при загрузке заказов:', error)
         throw error
      }
   }
)

export const updateOrder = createAsyncThunk(
   'orders/update',
   async ({ id, status }) => {
      const response = await axiosInstance.put(`/api/orders/${id}`, { status })
      return { id, status: response.data }
   }
)

export const deleteOrder = createAsyncThunk('orders/delete', async (id) => {
   await axiosInstance.delete(`/api/orders/${id}`)
   return id
})

const ordersSlice = createSlice({
   name: 'orders',
   initialState: {
      data: [],
      loading: false,
      error: null,
   },
   reducers: {
      clearError: (state) => {
         state.error = null
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchOrders.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchOrders.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
            state.error = null
         })
         .addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(updateOrder.fulfilled, (state, action) => {
            const index = state.data.findIndex(
               (o) => o.id === action.payload.id
            )
            if (index !== -1) {
               state.data[index].status = action.payload.status
            }
         })
         .addCase(deleteOrder.fulfilled, (state, action) => {
            state.data = state.data.filter((o) => o.id !== action.payload)
         })
   },
})

export const { clearError } = ordersSlice.actions
export default ordersSlice.reducer
