import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/frontend/Home";
import Appointment from "./page/frontend/Appointment";
import Login from "./page/frontend/Login";
import Register from "./page/frontend/Register";
import Navbar from "./components/frontend-components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./page/frontend/About";
import Footer from "./components/frontend-components/Footer";
import Sidebar from "./components/dashboard/Sidebar";
import AddNewAdmin from "./page/dashboard/AddNewAdmin";
import AddNewDoctor from "./page/dashboard/AddNewDoctor";
import Doctors from "./page/dashboard/Doctors";
import Dashboard from "./page/dashboard/Dashboard";
import Message from "./page/dashboard/Message";
import AdminLogin from "./page/dashboard/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, setAdmin } from "./store/userSlice";

const App = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch(login(user));
      if (user.role === "Admin") {
        dispatch(setAdmin());
      }
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        {!isAdmin && <Navbar />}
        {isAuthenticated && isAdmin && <Sidebar />}
        <Routes>
          <Route element={<Home />} path="/" />
          {isAuthenticated && (
            <Route element={<Appointment />} path="/appointment" />
          )}
          <Route element={<About />} path="/about" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />

          <Route element={<AdminLogin />} path="/adminlogin" />
          {isAuthenticated && isAdmin && (
            <Route element={<AddNewAdmin />} path="/addnewadmin" />
          )}
          {isAuthenticated && isAdmin && (
            <Route element={<AddNewDoctor />} path="/addnewdoctor" />
          )}
          {isAuthenticated && isAdmin && (
            <Route element={<Doctors />} path="/doctors" />
          )}
          {isAuthenticated && isAdmin && (
            <Route element={<Dashboard />} path="/dashboard" />
          )}
          {isAuthenticated && isAdmin && (
            <Route element={<Message />} path="/message" />
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {isAuthenticated && !isAdmin && <Footer />}
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
