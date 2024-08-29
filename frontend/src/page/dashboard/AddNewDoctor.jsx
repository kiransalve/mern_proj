import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const AddNewDoctor = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
  console.log(isAdmin, isAuthenticated);
  const doctorDepartments = [
    "Cardiology",
    "Dermatology",
    "Gynacologist",
    "General Physician",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    role: "Doctor",
    doctorDepartment: "",
    docAvatar: "",
    docAvatarPreview: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handledocAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setFormData((prevdata) => ({
        ...prevdata,
        docAvatar: file,
        docAvatarPreview: reader.result,
      }));
    };
  };
  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    Object.keys(formData).forEach((key) => {
      formdata.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/doctor/addnew`,
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          nic: "",
          dob: "",
          gender: "",
          password: "",
        });
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="page">
      <div className="container form-component add-doctor-form">
        <div className="auth-header">Add New Doctor</div>
        <form onSubmit={handleRegister}>
          <div className="first-wrapper">
            <div className="">
              <img
                src={
                  formData.docAvatarPreview
                    ? `${formData.docAvatarPreview}`
                    : "/docHolder.jpg"
                }
                alt=""
              />
              <input type="file" accept="image/*" onChange={handledocAvatar} />
            </div>
          </div>

          <input
            type="text"
            name="firstName"
            placeholder="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nic"
            placeholder="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <select
            value={formData.gender}
            name="gender"
            placeholder="gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="doctorDepartment"
            value={formData.doctorDepartment}
            onChange={handleChange}
          >
            <option value="">Select</option>

            {doctorDepartments.map((department, index) => {
              return (
                <option value={department} key={index}>
                  {department}
                </option>
              );
            })}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
