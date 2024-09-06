import useStatusCount from "../../../hooks/useStatusCount";

const StatusCard = () => {
  const data = useStatusCount();

  return (
    <>
      {data &&
        data.map((elm, index) => {
          return (
            <div
              key={index}
              className="md:w-40 w-full md:h-40 h-28 px-4 py-2 border rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-white hover:text-violet-500"
            >
              <div className="md:text-[20px] sm:text-[16px] text-[14px] text-center font-bold flex-1 flex justify-center items-center">
                {elm.status}
              </div>
              <div className="md:text-[40px] text-[24px] text-center font-bold flex-1">
                {elm.count}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default StatusCard;
