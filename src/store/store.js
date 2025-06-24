import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import reviewsReducer from './ReviewsSlice';
import { injectStore } from '../configs/axiosInstans';

const rootReducer = combineReducers({
  reviews: reviewsReducer,
});

const persistConfig = {
  key: 'GADJETARIUM',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

injectStore(store);

const persistor = persistStore(store);

export { store, persistor }