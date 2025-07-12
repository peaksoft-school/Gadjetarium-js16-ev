import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ordersReducer from '../pages/orderSlice'
import reviewsReducer from './reviews/ReviewsSlice'
import { injectStore } from '../configs/axiosInstans'
import { authReducer } from './authSlice/authSlice'
import productReducer from './products/productSlice'
import bannerReducer from './banner/bannerSlice'
import discountReducer from './discount/DiscountSlice'
import mailReducer from './mailing/mailSlice'
import infographicReducer from './../pages/features/infographicSlice'
import basketReducer from './basket/basketSlice'

const rootReducer = combineReducers({
   product: productReducer,
   reviews: reviewsReducer,
   auth: authReducer,
   banner: bannerReducer,
   discount: discountReducer,
   mail: mailReducer,
   infographic: infographicReducer,
   auth: authReducer,
   orders: ordersReducer,
   basket: basketReducer,
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
