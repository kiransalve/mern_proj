import calculatePatientAppointmentCounts from "../../../../utils/calculatePatientAppointmentCounts";
import { useSelector } from "react-redux";

const UserTable = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const { patients } = useSelector((state) => state.patients);

  return (
    <div className="flex flex-col md:mx-11">
      <div className="heading text-2xl font-bold my-6">Users</div>
      <div className="overflow-auto scroll-none">
        <table className="min-w-full border-collapse table-fixed ">
          <thead>
            <tr className="uppercase text-sm leading-normal border-b bg-gray-50 text-[#8570ed]">
              <th className="py-3 px-10 font-bold text-[17px] text-left">
                Name
              </th>
              <th className="py-3 px-10 font-bold text-[17px] text-left">
                Email
              </th>
              <th className="py-3 px-10 font-bold text-[17px] text-left">
                DOB
              </th>
              <th className="py-3 px-10 font-bold text-[17px] text-left">
                Phone
              </th>
              <th className="py-3 px-10 font-bold text-[17px] text-center">
                Gender
              </th>
              <th className="py-3 px-10 font-bold text-[17px] text-center">
                Appointments
              </th>
              <th className="py-3 px-10 font-bold text-[17px] text-center">
                Accepted Appointments
              </th>
              <th className="py-3 pr-10 font-bold text-[17px] text-center">
                Pending Appointments
              </th>
              <th className="py-3 px-3 font-bold text-[17px] text-center">
                Rejected Appointments
              </th>
            </tr>
          </thead>
          <tbody>
            {patients && patients.length > 0 ? (
              patients.map((element, index) => {
                return (
                  <tr
                    className="border-b border-gray-200 font-bold cursor-pointer"
                    key={index}
                  >
                    <td className="py-3 px-5 text-left whitespace-nowrap uppercase">
                      {element.firstName} {element.lastName}
                    </td>
                    <td className="py-3 px-10 text-left">{element.email}</td>
                    <td className="py-3 px-1 text-center">
                      {new Date(element.dob).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-3 px-10 text-center">{element.phone}</td>
                    <td className="py-3 px-10 text-center">{element.gender}</td>
                    <td className="py-3 px-10 text-center">
                      {
                        calculatePatientAppointmentCounts(
                          element._id,
                          appointments
                        ).count
                      }
                    </td>
                    <td className="py-3 px-10 text-center">
                      {
                        calculatePatientAppointmentCounts(
                          element._id,
                          appointments
                        ).acceptedCount
                      }
                    </td>
                    <td className="py-3 px-10 text-center">
                      {
                        calculatePatientAppointmentCounts(
                          element._id,
                          appointments
                        ).pendingCount
                      }
                    </td>
                    <td className="py-3 px-6 text-center">
                      {
                        calculatePatientAppointmentCounts(
                          element._id,
                          appointments
                        ).rejectedCount
                      }
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No patient found..!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
