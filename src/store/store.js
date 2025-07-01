import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import favoritesReducer from './favorite/favoriteSlice'
import authSlice from './authSlice/authSlice'
import { injectStore } from '../configs/axiosInstans'
import productReducer from './products/productSlice'
import bannerReducer from './banner/bannerSlice'
import discountReducer from './discount/DiscountSlice'
import mailReducer from './mailing/mailSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   product: productReducer,
   banner: bannerReducer,
   discount: discountReducer,
   mail: mailReducer,
   favorite: favoritesReducer,
})

const persistConfig = {
   key: 'GADJETARIUM',
   storage,
   whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

injectStore(store)

const persistor = persistStore(store)

export { store, persistor }
