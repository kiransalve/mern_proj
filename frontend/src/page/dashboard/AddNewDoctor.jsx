import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const AddNewDoctor = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const doctorDepartments = [
    "Cardiology",
    "Dermatology",
    "Gynecology",
    "General Physician",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    role: "Doctor",
    doctorDepartment: "",
    docAvatar: "",
    docAvatarPreview: "",
  });

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

          dob: "",
          gender: "",
          password: "",
          doctorDepartment: "",
          docAvatar: "",
          docAvatarPreview: "",
        });
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  // Redirect non-admin users
  if (!isAuthenticated || !isAdmin) {
    navigate("/login");
  }

  return (
    <section className="relative md:left-11 left-0 w-full mt-11 mb-52">
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="heading">Add New Doctor</div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-4 md:flex-row flex-col md:items-center items-start">
            {formData.docAvatarPreview ? (
              <img
                className="w-32 h-32 rounded-lg mb-4"
                src={formData.docAvatarPreview}
                alt={`${formData.firstName} ${formData.lastName}`}
              />
            ) : (
              <FaUserCircle className="w-32 h-32" />
            )}
            <div className="">
              <input type="file" accept="image/*" onChange={handledocAvatar} />
            </div>
          </div>

          <div className="flex gap-4 md:flex-row flex-col">
            <input
              className="input-box"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              className="input-box"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 md:flex-row flex-col">
            <input
              className="input-box"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-box"
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 md:flex-row flex-col">
            <input
              className="input-box md:flex-1"
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <select
              value={formData.gender}
              name="gender"
              placeholder="Gender"
              onChange={handleChange}
              required
              className="input-box flex-1"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="doctorDepartment"
              value={formData.doctorDepartment}
              onChange={handleChange}
              className="input-box flex-1"
            >
              <option value="">Select Department</option>
              {doctorDepartments.map((department, index) => (
                <option value={department} key={index}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <input
              className="input-box w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn border" type="submit">
            Add Doctor
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
