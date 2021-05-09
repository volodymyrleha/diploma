import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter.slice';
import authReducer from './reducers/auth.slice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  }
})