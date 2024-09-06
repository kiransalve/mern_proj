import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: [],
  isLoading: false,
};

export const fetchAllpatients = createAsyncThunk(
  "patients/fetchpatients",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/patient`,

      {
        withCredentials: true,
      }
    );
    return response.data.patient;
  }
);

const patientslice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllpatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllpatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchAllpatients.rejected, (state) => {
        state.isLoading = false;
        state.patients = [];
      });
  },
});

export default patientslice.reducer;
