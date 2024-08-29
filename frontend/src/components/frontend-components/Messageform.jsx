import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Messageform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/message/send`,
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setFirstName("");
        setLastName("");
        setMessage("");
        setPhone("");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container form-component message-form">
      <div className="form-heading">Send us a Message</div>
      <form onSubmit={handleMessage}>
        <div className="">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <textarea
          rows="7"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div
          className=""
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Messageform;
