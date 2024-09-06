import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointments: [],
  isLoading: false,
};

export const fetchAllAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/v1/appointment/getall`,
      {
        withCredentials: true,
      }
    );
    return response.data.appointment;
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateAppointmentStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/v1/appointment/update/${id}`,
      { status },
      {
        withCredentials: true,
      }
    );
    return response.data.appointment;
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state) => {
        state.isLoading = false;
        state.appointments = [];
      }) // Update appointment status
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment
        );
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update appointment status";
      });
  },
});

export default appointmentSlice.reducer;
