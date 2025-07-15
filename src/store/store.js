// import persistReducer from 'redux-persist/es/persistReducer'
// import persistStore from 'redux-persist/es/persistStore'
// import storage from 'redux-persist/lib/storage'
// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import ordersReducer from '../pages/orderSlice'
// import reviewsReducer from './reviews/ReviewsSlice'
// import { injectStore } from '../configs/axiosInstans'
// import { authReducer } from './authSlice/authSlice'
// import productReducer from './products/productSlice'
// import bannerReducer from './banner/bannerSlice'
// import bannerReducer2 from './banner/bannerSlice2'
// import discountReducer from './discount/DiscountSlice'
// import mailReducer from './mailing/mailSlice'
// import productReducer2 from './product/productSlice2'
// import infographicReducer from './../pages/features/infographicSlice'

// const rootReducer = combineReducers({
//    product: productReducer,
//    products: productReducer2,
//    reviews: reviewsReducer,
//    auth: authReducer,
//    banner: bannerReducer,
//    banner2: bannerReducer2,
//    discount: discountReducer,
//    mail: mailReducer,
//    infographic: infographicReducer,
//    orders: ordersReducer,
// })

// const persistConfig = {
//    key: 'GADJETARIUM',
//    storage,
//    whitelist: ['auth'],
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//    reducer: persistedReducer,
//    middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//          serializableCheck: false,
//       }),
// })

// injectStore(store)

// const persistor = persistStore(store)

// export { store, persistor }

import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ordersReducer from '../pages/orderSlice'
import reviewsReducer from './reviews/ReviewsSlice'
import { injectStore } from '../configs/axiosInstans'
import { authReducer } from './authSlice/authSlice'
// import productReducer from './products/productSlice'
import bannerReducer from './banner/bannerSlice'
import bannerReducer2 from './banner/bannerSlice2'
import discountReducer from './discount/DiscountSlice'
import mailReducer from './mailing/mailSlice'
import productReducer2 from './product/productSlice2'
import infographicReducer from './../pages/features/infographicSlice'
import favoritesReducer from './favorites/favoritesSlice'

const rootReducer = combineReducers({
   // product: productReducer,
   products: productReducer2,
   reviews: reviewsReducer,
   auth: authReducer,
   banner: bannerReducer,
   banner2: bannerReducer2,
   discount: discountReducer,
   mail: mailReducer,
   infographic: infographicReducer,
   orders: ordersReducer,
   favorites: favoritesReducer,
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
