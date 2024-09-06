import { GiNotebook } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-28">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Doctor Checkup Section */}
        <div className="flex-1 bg-slate-50 flex gap-6 py-7 px-6 text-[#8570ed] rounded-xl shadow-lg">
          <GiNotebook className="text-[50px]" />
          <div className="flex flex-col gap-6">
            <div className="text-[20px] font-bold">
              Need a Doctor for checkup?
            </div>
            <div className="heading">Just make an Appointment</div>
            <div className="">
              <button
                className="font-bold border py-1 px-2 rounded-lg bg-[#8570ed] text-white"
                onClick={() => navigate("/appointment")}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="flex-1">
          <div className="w-full py-7 px-6 flex flex-col gap-4">
            <div className="flex items-center justify-center mb-4">
              <FaRegClock className="text-[40px]" />
              <div className="text-[24px] font-bold ml-4">Opening Hours</div>
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="flex md:flex-row flex-col justify-between border-b border-gray-300 pb-2">
                <div>Monday - Friday</div>
                <div>08:00 AM - 10:00 PM</div>
              </div>
              <div className="flex justify-between md:flex-row flex-col  border-b border-gray-300 pb-2">
                <div>Saturday - Sunday</div>
                <div>09:00 AM - 06:00 PM</div>
              </div>
              <div className="flex justify-between md:flex-row flex-col ">
                <div>Emergency Services</div>
                <div>24 Hours Open</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
