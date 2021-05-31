import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth.slice';
import userReducer from './features/user.slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  }
})