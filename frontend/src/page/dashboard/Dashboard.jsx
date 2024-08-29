import axios from "axios";
import { useEffect, useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [app, setApp] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/appointment/getall`,
          {
            withCredentials: true,
          }
        );
        setApp(data?.appointment);
      } catch (error) {
        setApp([]);
        console.error(error);
      }
    };
    fetchAppointment();
  }, []);

  const handleUpdateStatus = async (appId, status) => {
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/appointment/update/${appId}`,
        { status },
        { withCredentials: true }
      );
      toast.success(data.message);
      setApp((prevApp) =>
        prevApp.map((app) => (app._id === appId ? { ...app, status } : app))
      );
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="Dashboard Image" />
          <div className="content">
            <p>Hello,</p>
            <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointment</p>
          <h3>1500</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>20 </h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {app && app.length > 0 ? (
              app.map((element, index) => (
                <tr className="" key={index}>
                  <td>
                    {element.firstName} {element.lastName}
                  </td>
                  <td>{element.appointment_date}</td>
                  <td>
                    {element.doctor.firstName} {element.doctor.lastName}
                  </td>
                  <td>{element.department}</td>
                  <td>
                    <select
                      className={
                        element.status === "Pending"
                          ? "value-pending"
                          : element.status === "Rejected"
                          ? "value-rejected"
                          : "value-accepted"
                      }
                      value={element.status}
                      onChange={(e) =>
                        handleUpdateStatus(element._id, e.target.value)
                      }
                    >
                      <option value="Pending" className="value-pending">
                        Pending
                      </option>
                      <option value="Accepted" className="value-accepted">
                        Accepted
                      </option>
                      <option value="Rejected" className="value-rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td>
                    {element.hasVisited === true ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No appointments found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
