const calculatePatientAppointmentCounts = (id, appointments) => {
  if (!appointments)
    return { count: 0, acceptedCount: 0, pendingCount: 0, rejectedCount: 0 };

  const appointment = appointments.filter(
    (appointment) => appointment.patientId === id
  );
  const acceptedCount = appointment.filter(
    (appointment) => appointment.status === "Accepted"
  ).length;
  const rejectedCount = appointment.filter(
    (appointment) => appointment.status === "Rejected"
  ).length;
  const pendingCount = appointment.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  return {
    count: appointment.length,
    acceptedCount,
    pendingCount,
    rejectedCount,
  };
};

export default calculatePatientAppointmentCounts;
