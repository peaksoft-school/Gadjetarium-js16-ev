import { createSlice } from '@reduxjs/toolkit';
import { fetchBasket, removeFromBasket, toggleFavorite } from './basketThunk';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basketItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleSelectAll: (state, action) => {
      state.basketItems = state.basketItems.map(item => ({ ...item, selected: action.payload }));
    },
    toggleSelect: (state, action) => {
      const { productTypeId, selected } = action.payload;
      const item = state.basketItems.find(i => i.productTypeId === productTypeId);
      if (item) item.selected = selected;
    },
    increase: (state, action) => {
      const { productTypeId } = action.payload;
      const item = state.basketItems.find(i => i.productTypeId === productTypeId);
      if (item) {
        item.quantity = (item.quantity || 0) + 1; 
      }
    },
    decrease: (state, action) => {
      const { productTypeId } = action.payload;
      const item = state.basketItems.find(i => i.productTypeId === productTypeId);
      if (item && (item.quantity || 0) > 1) {
        item.quantity = (item.quantity || 0) - 1; 
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBasket.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchBasket.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.basketItems = payload.map(item => ({
          productTypeId: item.productTypeId,
          imageUrl: item.imageUrl,
          name: item.name,
          rating: item.rating,
          reviews: item.reviews,
          inStock: item.inStock,
          code: item.code,
          quantity: item.quantity || 1,
          price: item.price || 0, 
          selected: item.selected ?? true,
          isLiked: item.isLiked ?? false,
        }));
      })
      .addCase(fetchBasket.rejected, (state, { payload }) => { state.loading = false; state.error = payload; })
      .addCase(removeFromBasket.fulfilled, (state, { payload }) => {
        state.basketItems = state.basketItems.filter(i => i.productTypeId !== payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, { payload }) => {
        const item = state.basketItems.find(i => i.productTypeId === payload.productTypeId);
        if (item) item.isLiked = payload.isLiked;
      });
  },
});

export const { toggleSelectAll, toggleSelect, increase, decrease } = basketSlice.actions;
export default basketSlice.reducer;