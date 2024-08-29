import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const name = user?.firstName;

  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      // Clear localStorage
      localStorage.removeItem("user");

      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <nav className="container">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logo.svg" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"} className="btn">
            Home
          </Link>
          <Link to={"/appointment"} className="btn">
            Appointment
          </Link>
          <Link to={"/about"} className="btn">
            About
          </Link>
        </div>
        {isAuthenticated && <div className="">Hi, {name}</div>}
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handlelogout}>
            Logout
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={handlelogin}>
            Login
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        {show ? <GiHamburgerMenu /> : <ImCross />}
      </div>
    </nav>
  );
};

export default Navbar;
