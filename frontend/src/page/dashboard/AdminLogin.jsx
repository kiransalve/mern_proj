import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, setAdmin } from "../../store/userSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/login`,
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response); // Log the response for debugging

      // Check if the response and required fields exist
      if (response?.data?.success) {
        toast.success(response?.data?.message);

        // Make sure the user object exists before accessing it
        if (response.data.user) {
          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));

          // Dispatch login action with user data
          dispatch(login(response.data.user));

          // Check if the user is an Admin before setting admin state
          if (response.data.user.role === "Admin") {
            dispatch(setAdmin());
          }

          // Navigate to dashboard
          navigate("/dashboard");
        } else {
          // Handle the case where user data is not found
          toast.error("User data not found in the response");
        }
      } else {
        // Handle the case where login is not successful
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container form-component">
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
    </div>
  );
};

export default AdminLogin;
