import { useContext, useState } from "react";
import { Context } from "../context/AppWrapper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
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
