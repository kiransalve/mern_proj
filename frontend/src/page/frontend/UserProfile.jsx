import Profile from "../../components/frontend-components/Profile/Profile";
import UserAppointments from "../../components/frontend-components/Profile/UserAppointments";
import DoctorAppointments from "../../components/frontend-components/Profile/DoctorAppointments";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user.role);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:justify-between gap-4 md:p-4 p-2">
      <div className="w-full lg:w-[360px]">
        <Profile />
      </div>
      <div className="w-full ">
        {user && user.role === "Doctor" ? (
          <DoctorAppointments />
        ) : (
          <UserAppointments />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
