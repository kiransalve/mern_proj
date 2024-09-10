import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/userSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            { email, password, role: "Admin" },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response?.data?.success) {
            toast.success(response?.data?.message);
            dispatch(fetchCurrentUser());
            navigate("/dashboard");
          } else {
            toast.error(response?.data?.message || "Login failed");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "An error occurred");
        } finally {
          setLoading(false); // Reset loading state
        }
      }, 3000);
    },
    [email, password, dispatch, navigate]
  );

  return (
    <div className="flex items-center justify-start flex-col gap-10 h-screen">
      <div className="heading">Admin Log In</div>
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
        <div className="btn border text-center flex items-center justify-center overflow-hidden">
          {loading ? (
            <div className="spinner"></div> // Show spinner when loading
          ) : (
            <button type="submit">Login</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
