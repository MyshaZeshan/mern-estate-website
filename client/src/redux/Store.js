import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './user/userSlice.js';

export const store = configureStore({
  reducer: {user:userReducer}, // manager
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck:false, //disables redux built-in safety checker so your app can store complex non plain data without 
    // throwing console errors
  })
});