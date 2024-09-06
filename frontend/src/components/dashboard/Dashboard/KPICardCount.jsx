import { useSelector } from "react-redux";

const KPICardCount = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const { doctors } = useSelector((state) => state.doctors);
  const { patients } = useSelector((state) => state.patients);

  const data = [
    {
      label: "Total Appointments",
      value: appointments.length,
    },
    {
      label: "Total Doctors",
      value: doctors.length,
    },
    {
      label: "Total Patients",
      value: patients.length,
    },
  ];
  return (
    <>
      {data &&
        data.map((elem, index) => {
          return (
            <div
              className="md:w-40 w-full md:h-40 h-28 px-4 py-2 border rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-white hover:text-violet-500"
              key={index}
            >
              <div className="md:text-[20px] sm:text-[16px] text-[14px] text-center font-bold flex-1 flex justify-center items-center">
                {elem.label}
              </div>
              <div className="md:text-[40px] text-[24px] text-center font-bold flex-1">
                {elem.value}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default KPICardCount;
