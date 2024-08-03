import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [
    { name: 'User One', username: 'userone' },
    { name: 'User Two', username: 'usertwo' },
    { name: 'User Three', username: 'userthree' },
  ],
  reducers: {},
});

export default usersSlice.reducer;
