import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddNewAdmin from "./page/AddNewAdmin";
import AddNewDoctor from "./page/AddNewDoctor";
import Login from "./page/Login";
import Doctors from "./page/Doctors";
import Dashboard from "./page/Dashboard";
import Message from "./page/Message";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { Context } from "../context/AppWrapper";
import axios from "axios";
import Sidebar from "./component/Sidebar";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    Context
  );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route element={<AddNewAdmin />} path="/addnewadmin" />
          <Route element={<AddNewDoctor />} path="/addnewdoctor" />
          <Route element={<Login />} path="/login" />
          <Route element={<Doctors />} path="/doctors" />
          <Route element={<Dashboard />} path="/" />
          <Route element={<Message />} path="/message" />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
};

export default App;
