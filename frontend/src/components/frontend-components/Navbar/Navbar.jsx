import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="md:px-[100px] px-[40px]">
      {/* Mobile Navlinks */}
      <div className="lg:hidden block">
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
      </div>
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
            <div
              className="font-bold text-violet-500 bg-white rounded-lg px-2 py-1 cursor-pointer hover:bg-[#8570ed] hover:text-white border"
              onClick={() => navigate("/me")}
            >
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
