import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAppointments,
  updateAppointmentStatus,
} from "../../../store/appointmentSlice";
import { fetchAllpatients } from "../../../store/patientSlice";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const myAppointments = appointments.filter(
    (elm) => elm.doctorId === user._id
  );
  useEffect(() => {
    dispatch(fetchAllAppointments());
    dispatch(fetchAllpatients());
  }, [dispatch]);

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateAppointmentStatus({ id, status: newStatus }));
    toast.success(`Status updated to ${newStatus}`);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="heading font-bold my-4">Appointment</div>
        <div className="heading">
          {" "}
          Total : {myAppointments && myAppointments.length}
        </div>
      </div>
      <div className="overflow-auto scroll-none">
        <table className="min-w-full border-collapse table-fixed ">
          <thead>
            <tr className="uppercase text-sm leading-normal border-b bg-gray-50 text-[#8570ed]">
              <th className="py-3 px-2 font-bold text-[17px] text-left">
                Date
              </th>
              <th className="font-bold text-[17px] text-center">
                Patient Name
              </th>

              <th className="font-bold text-[17px] text-center">Email</th>
              <th className="font-bold text-[17px] text-center">Phone</th>
              <th className="font-bold text-[17px] text-center">DOB</th>
              <th className="font-bold text-[17px] text-center">Address</th>
              <th className="font-bold text-[17px] text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((elm, index) => {
              return (
                <tr
                  className="border-b border-gray-200 font-bold cursor-pointer"
                  key={index}
                >
                  <td className=" text-left">
                    {new Date(elm.appointment_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3 text-left">
                    {elm.firstName} {elm.lastName}
                  </td>

                  <td className="py-3 px-2 text-center">{elm.email}</td>
                  <td className="py-3 px-2 text-center">{elm.phone}</td>
                  <td className="py-3 px-2 text-center">
                    {new Date(elm.dob).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 text-center">{elm.address}</td>
                  <td className="py-3 px-6 text-center">
                    <select
                      className="input-box py-1 px-2 rounded border border-gray-300"
                      value={elm.status}
                      onChange={(e) =>
                        handleUpdateStatus(elm._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
