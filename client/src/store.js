import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.slice';
import userReducer from './reducers/user.slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  }
})