import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "./Chart";

const DailyAppointmentChart = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const [dailyAppointments, setDailyAppointments] = useState([]);

  // Process daily appointments count
  useEffect(() => {
    const appointmentsByDate = appointments?.reduce((acc, curr) => {
      const date = new Date(curr.appointment_date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Convert to array of objects for the chart
    const formattedData = Object.keys(appointmentsByDate).map((date) => ({
      date,
      count: appointmentsByDate[date],
    }));
    setDailyAppointments(formattedData);
  }, [appointments]);

  return (
    <div>
      <Chart
        data={dailyAppointments}
        dataKey="date"
        title="Daily Appointment Chart"
      />
    </div>
  );
};

export default DailyAppointmentChart;
