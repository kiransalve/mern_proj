import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstName: "",
    doctor_lastName: "",
    address: "",
  });
  const [doctorDepartments] = useState([
    "Cardiology",
    "Dermatology",
    "Gynacologist",
    "General Physician",
  ]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/doctors`,
        {
          withCredentials: true,
        }
      );
      setDoctor(data?.doctors);
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDoctorChange = (e) => {
    const [firstName, lastName] = e.target.value.split(" ");
    setFormData({
      ...formData,
      doctor_firstName: firstName || "",
      doctor_lastName: lastName || "",
    });
  };
  const navigate = useNavigate();
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/appointment/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="heading">Book Appointment</div>
      <form onSubmit={handleAppointment} className="flex flex-col gap-4">
        <div className="flex gap-4 md:flex-row flex-col">
          <input
            placeholder="FirstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input-box flex-1"
            required
          />

          <input
            placeholder="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input-box flex-1"
          />
        </div>
        <div className="flex gap-4 md:flex-row flex-col">
          <input
            placeholder="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-box flex-1"
          />

          <input
            placeholder="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-box flex-1"
          />
        </div>
        <div className="flex gap-4 md:flex-row flex-col">
          <input
            placeholder="DOB"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="input-box flex-1"
          />
        </div>
        <div className="flex gap-4 md:flex-row flex-col">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="input-box flex-1"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            placeholder="Appointment Date"
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            className="input-box flex-1"
          />
        </div>
        <div className="flex gap-4 md:flex-row flex-col">
          <select
            value={formData.department}
            onChange={handleChange}
            name="department"
            className="input-box flex-1"
          >
            <option value="">Select Department</option>
            {doctorDepartments.map((department, index) => {
              return (
                <option value={department} key={index}>
                  {department}
                </option>
              );
            })}
          </select>

          <select
            value={`${formData.doctor_firstName} ${formData.doctor_lastName}`}
            onChange={handleDoctorChange}
            disabled={!formData.department}
            className="input-box flex-1"
          >
            <option value="">Select Doctor</option>
            {doctor &&
              doctor
                .filter((doc) => doc.doctorDepartment === formData.department)
                .map((doctor, index) => {
                  return (
                    <option
                      key={index}
                      value={`${doctor.firstName} ${doctor.lastName}`}
                    >
                      {`${doctor.firstName} ${doctor.lastName}`}
                    </option>
                  );
                })}
          </select>
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="input-box"
        />

        <button type="submit" className="btn border">
          Get Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
