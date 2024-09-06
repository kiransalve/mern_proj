import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice";
import userReducer from "./userSlice";
import doctorReducer from "./doctorSlice";
import patientReducer from "./patientSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    patients: patientReducer,
  },
});

export default store;
