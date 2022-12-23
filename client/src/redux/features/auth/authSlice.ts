import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../Store';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      username: null,
    },
  },
  reducers: {
    setCredentials(state, action) {
      const { email, username } = action.payload;
      state.user.email = email;
      state.user.username = username;
    },
    logOut(state, _) {
      state.user.email = null;
      state.user.username = null;
    },
  },
});

export default authSlice.reducer;

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
