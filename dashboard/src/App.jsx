import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddNewAdmin from "./page/AddNewAdmin";
import AddNewDoctor from "./page/AddNewDoctor";
import Login from "./page/Login";
import Doctors from "./page/Doctors";
import Dashboard from "./page/Dashboard";
import Message from "./page/Message";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { Context } from "../context/AppWrapper";
import axios from "axios";
import Sidebar from "./component/Sidebar";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(
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
        console.error(error);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <BrowserRouter>
      {isAuthenticated && <Sidebar />}
      <Routes>
        {isAuthenticated && (
          <Route element={<AddNewAdmin />} path="/addnewadmin" />
        )}
        {isAuthenticated && (
          <Route element={<AddNewDoctor />} path="/addnewdoctor" />
        )}
        <Route element={<Login />} path="/login" />
        {isAuthenticated && <Route element={<Doctors />} path="/doctors" />}
        {isAuthenticated && (
          <Route element={<Dashboard user={user} />} path="/" />
        )}
        {isAuthenticated && <Route element={<Message />} path="/message" />}
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
