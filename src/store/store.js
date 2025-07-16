import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import favoriteReducer from './lk-favorite/favoriteSlice'
import favoritesReducer from './favorites/favoritesSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reviewsReducer from './reviews/ReviewsSlice'
import ordersReducer from '../pages/orderSlice'
import orderHistoryReducer from './orders/orderHistorySlice'
import { injectStore } from '../configs/axiosInstans'
import { authReducer } from './authSlice/authSlice'
import productReducer from './products/productSlice'
import bannerReducer from './banner/bannerSlice'
import bannerReducer2 from './banner/bannerSlice2'
import discountReducer from './discount/DiscountSlice'
import mailReducer from './mailing/mailSlice'
import productReducer2 from './product/productSlice2'
import infographicReducer from './../pages/features/infographicSlice'
import basketReducer from './basket/basketSlice'
import profileReducer from './profile/profileSlice'

const rootReducer = combineReducers({
   orders: ordersReducer,
   orderHistory: orderHistoryReducer,
   product: productReducer,
   reviews: reviewsReducer,
   auth: authReducer,
   banner: bannerReducer,
   banner2: bannerReducer2,
   discount: discountReducer,
   mail: mailReducer,
   favorites: favoritesReducer,
   favorite: favoriteReducer,
   basket: basketReducer,
   products: productReducer2,
   infographic: infographicReducer,
   profile: profileReducer,
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
