import { useSelector } from "react-redux";
import calculateDoctorAppointmentCounts from "../../../utils/calculateDoctorAppointmentCounts";

const Doctors = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);
  return (
    <section className="w-full mt-11 mb-20 px-4">
      <div className="heading text-center mb-4">Doctors</div>
      <div className="overflow-x-auto scroll-none">
        <table className="min-w-full  ">
          <thead className="uppercase text-sm leading-normal border-b bg-gray-50 text-[#8570ed]">
            <tr>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Appointment
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Accepted Appointment
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Pending Appointment
              </th>
              <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                Rejected Appointment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={doctor?.docAvatar?.url || "/default-avatar.png"}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${doctor.firstName} ${doctor.lastName}`}
                  </td>
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
                    {
                      calculateDoctorAppointmentCounts(doctor._id, appointments)
                        .count
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {
                      calculateDoctorAppointmentCounts(doctor._id, appointments)
                        .acceptedCount
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {calculateDoctorAppointmentCounts(doctor._id).pendingCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {
                      calculateDoctorAppointmentCounts(doctor._id, appointments)
                        .rejectedCount
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No Doctors Found...
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
