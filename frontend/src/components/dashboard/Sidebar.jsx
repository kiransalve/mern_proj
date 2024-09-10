import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="bg-[#8570ed] z-10 fixed bottom-0 md:py-0 py-5 w-full md:w-16 md:h-full md:bottom-auto left-0 flex md:flex-col flex-row justify-evenly items-center px-4 md:px-0">
      <TiHome
        className="btn shadow-xl text-[35px]"
        onClick={() => navigate("/dashboard")}
      />
      <FaUserDoctor
        className="btn shadow-xl text-[35px]"
        onClick={() => navigate("/doctors")}
      />
      <MdAddModerator
        className="btn shadow-xl text-[35px]"
        onClick={() => navigate("/addnewadmin")}
      />
      <IoPersonSharp
        className="btn shadow-xl text-[35px]"
        onClick={() => navigate("/addnewdoctor")}
      />
      <AiFillMessage
        className="btn shadow-xl text-[35px]"
        onClick={() => navigate("/message")}
      />
      <RiLogoutBoxFill
        onClick={handlelogout}
        className="btn shadow-xl text-[30px]"
      />
    </div>
  );
};

export default Sidebar;
