import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { login, setAdmin, logout } = userSlice.actions;
export default userSlice.reducer;
