import { ImCross } from "react-icons/im";
import Links from "./Links";

const MobileNav = ({
  setShow,
  show,
  isAuthenticated,
  handleLogout,
  navigate,
  name,
}) => {
  return (
    <div className="fixed bg-violet-500 w-full h-screen z-10 left-0 top-0 ">
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <ImCross size={24} />
      </div>
      <div className="flex flex-col items-center justify-center gap-10 h-full ">
        {isAuthenticated && (
          <div className="font-bold text-violet-500 bg-white rounded-lg px-2 py-1">
            Hi {name}
          </div>
        )}

        <Links setShow={setShow} />
        <div className="" onClick={() => setShow(!show)}>
          <button
            onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
            className="btn"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
