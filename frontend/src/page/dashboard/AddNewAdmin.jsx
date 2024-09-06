import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    role: "Admin",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/admin/addnew`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
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
    <section className="relative md:left-11 left-0 w-full mt-11 mb-52">
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="heading">Add New Admin</div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-4 md:flex-row flex-col">
            <input
              className="input-box"
              type="text"
              name="firstName"
              placeholder="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              className="input-box"
              type="text"
              name="lastName"
              placeholder="lastName"
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
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-box"
              type="tel"
              name="phone"
              placeholder="phone"
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
              placeholder="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <select
              value={formData.gender}
              name="gender"
              placeholder="gender"
              onChange={handleChange}
              required
              className="input-box flex-1"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              className="input-box"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn border">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
