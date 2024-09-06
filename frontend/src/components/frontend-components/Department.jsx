import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.png",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.avif",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
    {
      name: "General Physician",
      imageUrl: "/departments/gen.avif",
    },
    {
      name: "Gynacology",
      imageUrl: "/departments/gyn.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="px-6 py-6">
      <div className="text-center my-5 heading">Departments</div>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["medium", "small"]}
        autoPlay={true}
        autoPlaySpeed={1500} // Adjust the speed as needed
        infinite={true}
        customTransition="transform 1000ms ease-in-out"
        transitionDuration={2000}
        containerClass="carousel-container"
        swipeable={true}
        draggable={true}
        pauseOnHover={true}
      >
        {departmentsArray.map((depart, index) => {
          return (
            <div
              className="relative rounded-lg flex flex-col justify-center items-center pb-4 pl-2 pr-4 min-h-[300px] mx-2"
              key={index}
            >
              <div className="bg-purple-500 bg-opacity-50  cursor-pointer w-48 text-lg uppercase flex justify-center py-2 rounded-full font-bold transition-colors duration-300">
                {depart.name}
              </div>
              <img
                src={depart.imageUrl}
                alt={depart.name}
                className="absolute w-full h-full object-cover rounded-lg z-[-1] "
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Department;
