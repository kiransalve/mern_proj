import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAppointments } from "../../store/appointmentSlice";
import { fetchAllDoctors } from "../../store/doctorSlice";
import { fetchAllpatients } from "../../store/patientSlice";
import KPICardCount from "../../components/dashboard/Dashboard/KPICardCount";
import StatusCard from "../../components/dashboard/Dashboard/StatusCard";
import DailyAppointmentChart from "../../components/dashboard/Dashboard/DailyAppointmentChart";
import StatusCountChart from "../../components/dashboard/Dashboard/StatusCountChart";
import AppointmentTable from "../../components/dashboard/Dashboard/AppointmentTable";
import UserTable from "../../components/dashboard/Dashboard/UserTable";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAppointments());
    dispatch(fetchAllDoctors());
    dispatch(fetchAllpatients());
  }, [dispatch]);

  return (
    <div className="relative md:left-11 left-0 w-full mt-11 mb-32 ">
      <div className="heading text-center">Dashboard</div>
      <div className="my-5 flex gap-4 w-full md:flex-row flex-col flex-wrap">
        <div className="flex md:gap-6 gap-4 md:flex-row flex-col flex-wrap w-full md:mx-11 justify-center">
          <KPICardCount />
          <StatusCard />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-7 justify-center">
        <DailyAppointmentChart />
        <StatusCountChart />
      </div>
      <AppointmentTable />
      <UserTable />
    </div>
  );
};

export default Dashboard;
