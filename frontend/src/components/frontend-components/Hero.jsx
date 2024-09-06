import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const title = "Online Doctor Appointment";
  const subtitle = " an Appointment Today to Avail the Best Medical Services";

  return (
    <div className="flex justify-between items-center md:flex-row flex-col">
      <div className="flex-1">
        <div className="flex flex-col gap-5">
          <div className="lg:text-[70px] md:text-[50px] text-[40px] font-bold leading-[70px] overflow-hidden">
            {title}
          </div>
          <div className="text-[20px] md:text-[25px] font-semibold">
            <button
              onClick={() => navigate("/appointment")}
              className="btn border bg-white text-[#8570ed] hover:text-white hover:bg-[#8570ed]"
            >
              Book
            </button>
            {subtitle}
          </div>
          <p className="text-[20px] md:text-left text-justify">
            Get benifit from outstanding healthcare community and evidence-based
            innovation to provide high-end medical services Ranked 1 Hospital in
            India
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center overflow-hidden">
        <img src={"/hero.png"} alt="hero" className="animate-scale" />
      </div>
    </div>
  );
};

export default Hero;
