import { useDispatch, useSelector } from "react-redux";
import { updateAppointmentStatus } from "../../../store/appointmentSlice";

const AppointmentTable = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateAppointmentStatus({ id, status: newStatus }));
  };
  return (
    <div>
      <div className="flex flex-col md:mx-11">
        <div className="heading text-2xl font-bold my-6">Appointments</div>
        <div className="overflow-auto scroll-none">
          <table className="min-w-full border-collapse shadow-md table-auto">
            <thead>
              <tr className="uppercase text-sm leading-normal border-b bg-gray-50 text-[#8570ed]">
                <th className="py-3 px-6 font-bold text-[17px] text-left">
                  Patient
                </th>
                <th className="py-3 px-6 font-bold text-[17px] text-left">
                  Date
                </th>
                <th className="py-3 px-6 font-bold text-[17px] text-left">
                  Doctor
                </th>
                <th className="py-3 px-6 font-bold text-[17px] text-left">
                  Department
                </th>
                <th className="py-3 px-6 font-bold text-[17px] text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((element) => (
                  <tr
                    className="border-b border-gray-200 font-bold cursor-pointer"
                    key={element._id}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap uppercase">
                      {element.firstName} {element.lastName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {element.appointment_date}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {element.doctor.firstName} {element.doctor.lastName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {element.department}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <select
                        className="input-box py-1 px-2 rounded border border-gray-300"
                        value={element.status}
                        onChange={(e) =>
                          handleUpdateStatus(element._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-3 px-6 text-center">
                    No appointments found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
