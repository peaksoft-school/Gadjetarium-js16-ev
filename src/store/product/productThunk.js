// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { axiosInstance } from '../../configs/axiosInstans'

// export const fetchProducts = createAsyncThunk(
//    'product/fetchProducts',

//    async (
//       { status = 'inStock', page = 0, size = 10, userId },
//       { rejectWithValue }
//    ) => {
//       console.log('Request params:', { status, page, size, userId })
//       try {
//          const response = await axiosInstance.get('/api/product/all', {
//             params: {
//                status: 'акции',
//                page: 0,
//                size: 20,
//                userId: 1,
//             },
//          })

//          return response.data
//       } catch (error) {
//          return rejectWithValue(error.response?.data || error.message)
//       }
//    }
// )

import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstans'

export const fetchProducts = createAsyncThunk(
   'product/fetchAll',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/product/all')
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
