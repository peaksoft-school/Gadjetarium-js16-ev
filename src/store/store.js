import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { injectStore } from '../configs/axiosInstans'

import productReducer from './products/productSlice'
import bannerReducer from './banner/bannerSlice'
import discountReducer from './discount/DiscountSlice'
import mailReducer from './mailing/mailSlice'
import infographicReducer from './../pages/features/infographicSlice'
import { authReducer } from './authSlice/authSlice'

const rootReducer = combineReducers({
   product: productReducer,
   banner: bannerReducer,
   discount: discountReducer,
   mail: mailReducer,
   infographic: infographicReducer,
   auth: authReducer,
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
