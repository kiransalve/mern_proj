import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/AppWrapper";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const [message, setMessage] = useState([]);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    Context
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          {
            withCredentials: true,
          }
        );
        setMessage(data?.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, []);
  return (
    <section className="page messages">
      <h1>Message</h1>
      <div className="banner">
        {message &&
          message.map((mes, index) => {
            return (
              <div className="card" key={index}>
                <div className="details">
                  <p>
                    First Name : <span>{mes.firstName}</span>
                  </p>
                  <p>
                    Last Name : <span>{mes.lastName}</span>
                  </p>
                  <p>
                    Email : <span>{mes.email}</span>
                  </p>
                  <p>
                    Phone : <span>{mes.phone}</span>
                  </p>
                  <p>
                    Message : <span>{mes.message}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Message;
