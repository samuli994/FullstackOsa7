import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import blogReducer from './blogSlice';
import notificationReducer from './notificationSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

export default store;
