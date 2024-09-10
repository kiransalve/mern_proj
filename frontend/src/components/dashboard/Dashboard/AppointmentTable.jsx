import { useSelector } from "react-redux";

const AppointmentTable = () => {
  const { appointments } = useSelector((state) => state.appointments);
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
                      {element.status === "Accepted" && (
                        <span className="bg-green-400 text-white p-1 rounded-md">
                          {element.status}
                        </span>
                      )}
                      {element.status === "Pending" && (
                        <span className="bg-yellow-400 text-white p-1 rounded-md">
                          {element.status}
                        </span>
                      )}
                      {element.status === "Rejected" && (
                        <span className="bg-red-400 text-white p-1 rounded-md">
                          {element.status}
                        </span>
                      )}
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
