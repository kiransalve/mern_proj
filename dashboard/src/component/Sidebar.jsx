import React, { useContext, useState } from "react";
import { Context } from "../../context/AppWrapper";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }
  const homepage = () => {
    navigate("/");
    setShow(!show);
  };
  const doctorpage = () => {
    navigate("/doctors");
  };
  const addnewadmin = () => {
    navigate("/addnewadmin");
  };
  const messagepage = () => {
    navigate("/message");
  };
  const addnewdoctor = () => {
    navigate("/addnewdoctor");
  };
  const handlelogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="">
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={homepage} />
          <FaUserDoctor onClick={doctorpage} />
          <MdAddModerator onClick={addnewdoctor} />
          <IoPersonSharp onClick={addnewadmin} />
          <AiFillMessage onClick={messagepage} />
          <RiLogoutBoxFill onClick={handlelogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </div>
  );
};

export default Sidebar;
