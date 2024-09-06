import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { login, setAdmin } from "./store/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Dashboard Component
import Sidebar from "./components/dashboard/Sidebar";

// Frontend Pages
import Home from "./page/frontend/Home";
import Appointment from "./page/frontend/Appointment";
import Login from "./page/frontend/Login";
import Register from "./page/frontend/Register";
import About from "./page/frontend/About";
import Contact from "./page/frontend/Contact";

// Dashboard Pages
import AdminLogin from "./page/dashboard/AdminLogin";
import AddNewAdmin from "./page/dashboard/AddNewAdmin";
import AddNewDoctor from "./page/dashboard/AddNewDoctor";
import Doctors from "./page/dashboard/Doctors";
import Dashboard from "./page/dashboard/Dashboard";
import Message from "./page/dashboard/Message";
import Navbar from "./components/frontend-components/Navbar/Navbar";
import Footer from "./components/frontend-components/Footer";

const App = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      dispatch(login(savedUser));

      savedUser.role === "Admin" && dispatch(setAdmin());
    }
    setLoading(false);
  }, [dispatch]);
  if (loading) return <div>Loading...</div>; // Render loading while checking auth state

  const authRoutes = [
    { path: "/addnewadmin", element: <AddNewAdmin /> },
    { path: "/addnewdoctor", element: <AddNewDoctor /> },
    { path: "/doctors", element: <Doctors /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/message", element: <Message /> },
  ];

  const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/adminlogin", element: <AdminLogin /> },
    { path: "/contact", element: <Contact /> },
  ];
  return (
    <BrowserRouter>
      <div className="mx-[40px] ">
        {!isAdmin && <Navbar />}
        {isAdmin && <Sidebar />}
        <Routes>
          {isAuthenticated && isAdmin
            ? // Render only If user is authenticated and is admin
              authRoutes.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
              ))
            : // If user is not authenticated and is not admin, publically available
              publicRoutes.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
              ))}
          {isAuthenticated && (
            <Route path="/appointment" element={<Appointment />} />
          )}
          {/* Default redirect for unauthenticated users */}
          {!isAuthenticated && (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
        <ToastContainer position="top-center" />
      </div>
      {!isAdmin && <Footer />}
    </BrowserRouter>
  );
};

export default App;
