import { useEffect, useState } from "react";
import axios from "axios";

const Message = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/message/getall`,
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
    <section className="w-full mt-11 mb-20">
      <div className="grid grid-rows-1 place-content-center">
        <div className="heading text-center mb-10">Message</div>
        <div className="overflow-x-auto scroll-none">
          <table className="">
            <thead className="uppercase text-sm leading-normal border-b bg-gray-50 text-[#8570ed]">
              <tr>
                <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left font-[19px]   uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {message && message.length > 0 ? (
                message.map((mes, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {`${mes.firstName} ${mes.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{mes.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{mes.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mes.message}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No Message Found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Message;
