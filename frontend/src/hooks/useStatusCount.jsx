import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStatusCount = () => {
  const { appointments } = useSelector((state) => state.appointments);

  const [accepted, setAccepted] = useState(0);
  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    const acceptedCount = appointments.filter(
      (appointment) => appointment.status === "Accepted"
    ).length;
    const rejectedCount = appointments.filter(
      (appointment) => appointment.status === "Rejected"
    ).length;
    const pendingCount = appointments.filter(
      (appointment) => appointment.status === "Pending"
    ).length;

    setAccepted(acceptedCount);
    setRejected(rejectedCount);
    setPending(pendingCount);
  }, [appointments]);

  const statusData = [
    { status: "Accepted", count: accepted },
    { status: "Rejected", count: rejected },
    { status: "Pending", count: pending },
  ];

  return statusData;
};

export default useStatusCount;
