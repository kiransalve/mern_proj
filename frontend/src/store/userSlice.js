import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  isLoading: false,
  isDoctor: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/currentUser",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/me`,
      {
        withCredentials: true,
      }
    );
    return response.data.user;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await axios.get(
    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/logout`,
    {
      withCredentials: true,
    }
  );
});

export const updateUserInfo = createAsyncThunk(
  "user/updateinfo",
  async ({ id, data }) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/v1/user/update/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAdmin = action.payload.role === "Admin";
        state.isDoctor = action.payload.role === "Doctor";
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.isDoctor = false;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAdmin = false;
        state.isDoctor = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      // Update User Info
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
