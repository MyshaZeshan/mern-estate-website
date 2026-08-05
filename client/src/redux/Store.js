import { configureStore , combineReducers } from '@reduxjs/toolkit';
import userReducer  from './user/userSlice.js';
import { persistReducer,persistStore } from 'redux-persist';
import storage from './storage.js'    

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key:'root',
  storage,
  version:1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const Store = configureStore({
  reducer: persistedReducer, // manager
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck:false, //disables redux built-in safety checker so your app can store complex non plain data without 
    // throwing console errors
  })
});

export const persistor = persistStore(Store);