import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../context/AppWrapper";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    Context
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    role: "Patient",
  });

  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/");
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
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
          nic: "",
          dob: "",
          gender: "",
          password: "",
        });
        setIsAuthenticated(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container form-component login-form">
      <div className="auth-header">Register</div>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
