import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/AppWrapper";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    Context
  );
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <div className="container form-component login-form">
      <div className="auth-header">Sign In</div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <div className="loginbtn">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="registernow">
        <div className="">Not Registered?</div>
        <Link to={"/register"} className="registerLink">
          Register Now
        </Link>
      </div>{" "}
    </div>
  );
};

export default Login;
