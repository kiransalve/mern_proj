import { useEffect } from "react";
import { fetchAllDoctors } from "../../store/doctorSlice";
import { useDispatch, useSelector } from "react-redux";

const DoctorCards = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  return (
    <div className="">
      <div className="heading text-center w-full">Doctors</div>
      <div className="flex items-center justify-center py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors.map((elm, index) => (
            <article
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer bg-white"
              key={index}
            >
              <img
                src={elm.docAvatar.url}
                className="w-full h-72 object-cover rounded-t-lg transition-transform group-hover:scale-105"
                alt={`${elm.firstName} ${elm.lastName}`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-end p-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {elm.doctorDepartment}
                  </h2>
                  <span className="text-sm text-white">
                    {elm.firstName} {elm.lastName}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCards;
