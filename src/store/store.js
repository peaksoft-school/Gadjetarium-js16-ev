import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import favoritesReducer from './lk-favorite/favoriteSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ordersReducer from '../pages/orderSlice'
import reviewsReducer from './reviews/ReviewsSlice'
import orderHistoryReducer from './orders/orderHistorySlice'
import { injectStore } from '../configs/axiosInstans'
import productReducer from './products/productSlice'
import bannerReducer from './banner/bannerSlice'
import discountReducer from './discount/DiscountSlice'
import mailReducer from './mailing/mailSlice'
import profileReducer from './profile/profileSlice'
import infographicReducer from './../pages/features/infographicSlice'
import basketReducer from './basket/basketSlice'
import { authReducer } from './authSlice/authSlice'

const rootReducer = combineReducers({
   orders: orderHistoryReducer,
   product: productReducer,
   reviews: reviewsReducer,
   auth: authReducer,
   banner: bannerReducer,
   discount: discountReducer,
   profile: profileReducer,
   mail: mailReducer,
   favorite: favoritesReducer,
   orders: ordersReducer,
   basket: basketReducer,
   infographic: infographicReducer,
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
