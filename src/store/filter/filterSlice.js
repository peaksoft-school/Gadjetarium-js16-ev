import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   filters: {},
   price: [500, 250000],
}

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setFilters(state, action) {
         state.filters = action.payload
      },
      setPrice(state, action) {
         state.price = action.payload
      },
      resetFilters(state) {
         state.filters = {}
         state.price = [500, 250000]
      },
   },
})

export const { setFilters, setPrice, resetFilters } = filterSlice.actions
export default filterSlice.reducer
