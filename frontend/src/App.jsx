import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Appointment from "./page/Appointment";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { Context } from "./context/AppWrapper";
import axios from "axios";
import About from "./page/About";
import Footer from "./components/Footer";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    Context
  );
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/patient/me",
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Appointment />} path="/appointment" />
          <Route element={<About />} path="/about" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
