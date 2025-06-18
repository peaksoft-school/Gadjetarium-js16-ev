// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import persistReducer from 'redux-persist/es/persistReducer'
// import persistStore from 'redux-persist/es/persistStore'
// import storage from 'redux-persist/lib/storage'

// const rootReducer = combineReducers({})

// const persistConfig = {
//    key: 'GADJETARIUM',
//    storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//    reducer: persistedReducer,

//    middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//          serializableCheck: false,
//       }),
// })

// const persistor = persistStore(store)

// export { store, persistor }

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import orderHistoryReducer from '../pages/features/orders/orderHistorySlice'

const rootReducer = combineReducers({
   orderHistory: orderHistoryReducer,
})

const persistConfig = {
   key: 'GADJETARIUM',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

const persistor = persistStore(store)

export { store, persistor }
