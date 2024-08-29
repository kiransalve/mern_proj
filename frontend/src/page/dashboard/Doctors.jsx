import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/doctors`,
          {
            withCredentials: true,
          }
        );
        setDoctors(data?.doctors);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error || "Something went wrong!";
        toast.error(errorMessage);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="page doctors">
      <h1>Doctors</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((elm, index) => (
            <div className="card" key={index}>
              <img
                src={elm?.docAvatar?.url || "/default-avatar.png"} // Used default image if `docAvatar` is not available
                alt={`${elm.firstName} ${elm.lastName}`}
              />
              <h4>{`${elm.firstName} ${elm.lastName}`}</h4>
              <div className="details">
                <p>Email: {elm.email}</p>
                <p>Phone: {elm.phone}</p>
                <p>Department: {elm.doctorDepartment}</p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
