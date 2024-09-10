import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../../../store/appointmentSlice";

const UserAppointments = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const myAppointments = appointments.filter(
    (elm) => elm.patientId === user._id
  );

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

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
              <th className="py-3 font-bold text-[17px] text-left px-3">
                Appointment Date
              </th>
              <th className="py-3 font-bold text-[17px] text-left px-3">
                Doctor
              </th>
              <th className="py-3 font-bold text-[17px] text-left px-3">
                Department
              </th>
              <th className="py-3 font-bold text-[17px] text-left px-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((elm, index) => {
              return (
                <tr
                  className="border-b border-gray-200 font-bold cursor-pointer"
                  key={index}
                >
                  <td className="py-3 text-left px-2">
                    {elm.appointment_date}
                  </td>
                  <td
                    className="py-3 text-left px-2
                  "
                  >
                    {elm.doctor.firstName} {elm.doctor.lastName}
                  </td>
                  <td
                    className="py-3 text-left px-2
                  "
                  >
                    {elm.department}
                  </td>
                  <td className="py-3 text-center">
                    {" "}
                    <td className="py-3 text-left">
                      {elm.status === "Accepted" && (
                        <span className="bg-green-400 text-white p-1 rounded-md">
                          {elm.status}
                        </span>
                      )}
                      {elm.status === "Pending" && (
                        <span className="bg-yellow-400 text-white p-1 rounded-md">
                          {elm.status}
                        </span>
                      )}
                      {elm.status === "Rejected" && (
                        <span className="bg-red-400 text-white p-1 rounded-md">
                          {elm.status}
                        </span>
                      )}
                    </td>{" "}
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

export default UserAppointments;
