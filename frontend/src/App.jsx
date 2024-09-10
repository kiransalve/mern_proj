import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { fetchCurrentUser } from "./store/userSlice";

// Frontend Pages
import Home from "./page/frontend/Home";
import Appointment from "./page/frontend/Appointment";
import Login from "./page/frontend/Login";
import Register from "./page/frontend/Register";
import About from "./page/frontend/About";
import Contact from "./page/frontend/Contact";
import UserProfile from "./page/frontend/UserProfile";

// Dashboard Pages
import AdminLogin from "./page/dashboard/AdminLogin";
import AddNewAdmin from "./page/dashboard/AddNewAdmin";
import AddNewDoctor from "./page/dashboard/AddNewDoctor";
import Doctors from "./page/dashboard/Doctors";
import Dashboard from "./page/dashboard/Dashboard";
import Message from "./page/dashboard/Message";
import DoctorLogin from "./page/doctor/DoctorLogin";
// Components
import Sidebar from "./components/dashboard/Sidebar";
import Navbar from "./components/frontend-components/Navbar/Navbar";
import Footer from "./components/frontend-components/Footer";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { fetchAllDoctors } from "./store/doctorSlice";
import { fetchAllAppointments } from "./store/appointmentSlice";
import { fetchAllpatients } from "./store/patientSlice";

const App = () => {
  const { isAuthenticated, isAdmin, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllDoctors());
    dispatch(fetchAllAppointments());
    dispatch(fetchAllpatients());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="mx-[40px]">
        {!isAdmin && <Navbar />}
        {isAuthenticated && isAdmin && <Sidebar />}
        <Routes>
          {/* Admin Routes */}
          {isAdmin ? (
            <>
              <Route path="/addnewadmin" element={<AddNewAdmin />} />
              <Route path="/addnewdoctor" element={<AddNewDoctor />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/message" element={<Message />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : null}

          {/* Authenticated User Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/me" element={<UserProfile />} />
            </>
          ) : null}

          {/* Public Routes */}
          {!isAdmin && <Route path="/" element={<Home />} />}
          {!isAdmin && <Route path="/about" element={<About />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          {!isAdmin && <Route path="/contact" element={<Contact />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-center" />
      </div>
      {!isAdmin && <Footer />}
    </BrowserRouter>
  );
};

export default App;
