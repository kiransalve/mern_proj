import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, setAdmin } from "../../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      // Set loading state
      setLoading(true);

      setTimeout(async () => {
        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/v1/user/login`,
            { email, password, confirmPassword, role: "Patient" },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(login(response.data.user));
            if (response.data.user.role === "Admin") setAdmin(true);
            navigate("/");
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
          toast.error(error.response.data.message);
        } finally {
          setLoading(false); // Reset loading state
        }
      }, 3000);
    },
    [email, password, confirmPassword, dispatch, navigate]
  );

  return (
    <div className="flex items-center justify-start flex-col gap-10 h-screen">
      <div className="heading">Sign In</div>
      <form onSubmit={handleLogin} className="flex flex-col gap-10">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="input-box"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input-box"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="input-box"
        />
        <div className="btn border text-center flex items-center text-center justify-center overflow-hidden">
          {loading ? (
            <div className="spinner"></div> // Show spinner when loading
          ) : (
            <button type="submit">Login</button>
          )}
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="">Not Registered?</div>
          <div className="underline">
            <Link to={"/register"} className="registerLink">
              Register Now
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
