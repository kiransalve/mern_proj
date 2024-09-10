import { useSelector } from "react-redux";
import calculateDoctorAppointmentCounts from "../../../utils/calculateDoctorAppointmentCounts";

const Doctors = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);
  const { isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="w-full mt-11 mb-20 px-8">
      <div className="heading text-center mb-4">Doctors</div>
      <div className="overflow-x-auto scroll-none">
        <table className="min-w-full">
          <thead className="uppercase text-sm leading-normal border-b bg-gray-50 text-[#8570ed]">
            <tr>
              <th className="px-6 py-3 text-left font-[19px] uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-6 py-3 text-left font-[19px] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-[19px] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left font-[19px] uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left font-[19px] uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left font-[19px] uppercase tracking-wider">
                Appointment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor, index) => {
                const {
                  count,
                  acceptedCount,
                  pendingCount,
                  rejectedCount,
                } = calculateDoctorAppointmentCounts(doctor._id, appointments);
                // Construct the status text by including only counts greater than 0
                const statusText = [
                  acceptedCount > 0 ? (
                    <span className="bg-green-500 px-2 py-1rounded-md mx-1">
                      A-{acceptedCount}
                    </span>
                  ) : null,
                  pendingCount > 0 ? (
                    <span className="bg-yellow-400 px-2 py-1 rounded-md mx-1">
                      P-{pendingCount}
                    </span>
                  ) : null,
                  rejectedCount > 0 ? (
                    <span className="bg-red-400 px-2 py-1 rounded-md mx-1">
                      R-{rejectedCount}
                    </span>
                  ) : null,
                  count === 0 ? (
                    <span className="bg-black/40 px-2 py-1 rounded-md mx-1">
                      No Appointment
                    </span>
                  ) : null,
                ];

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        className="w-12 h-12 object-cover rounded-full"
                        src={doctor?.docAvatar?.url || "/default-avatar.png"}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{`${doctor.firstName} ${doctor.lastName}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doctor.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doctor.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doctor.doctorDepartment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {statusText}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center">
                  No doctors available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Doctors;
