import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  doctors: [],
  isLoading: false,
};

export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/doctors`,
      {
        withCredentials: true,
      }
    );
    return response.data.doctors;
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state) => {
        state.isLoading = false;
        state.doctors = [];
      });
  },
});

export default doctorSlice.reducer;
