import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/userSlice";
import MobileNav from "./MobileNav";
import Links from "./Links";
const logo = "MediBooker";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const name = user?.firstName;

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      localStorage.removeItem("user");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(show);
  return (
    <nav className="md:px-[100px] px-[40px]">
      {/* Mobile Navlinks */}
      {show && (
        <MobileNav
          show={show}
          setShow={setShow}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          navigate={navigate}
          name={name}
        />
      )}
      <div className="py-5 w-full flex items-center justify-between">
        <div
          className="text-[30px] font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          {logo}
        </div>
        <div
          className="absolute right-5 top-5 cursor-pointer lg:hidden"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu size={24} />
        </div>
        <div className="lg:flex gap-7 hidden items-center">
          <Links setShow={setShow} />
          {isAuthenticated && (
            <div className="font-bold text-violet-500 bg-white rounded-lg px-2 py-1">
              Hi {name}
            </div>
          )}
          <button
            onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
            className="btn"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
