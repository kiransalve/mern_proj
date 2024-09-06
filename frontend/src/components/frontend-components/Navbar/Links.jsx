import { Link } from "react-router-dom";

const links = [
  { path: "/", title: "Home" },
  { path: "/appointment", title: "Appointment" },
  { path: "/about", title: "About" },
  { path: "/contact", title: "Contact" },
];
const Links = ({ setShow }) => {
  return (
    <>
      {links.map(({ path, title }, index) => (
        <Link
          to={path}
          key={index}
          className="hover:bg-white hover:text-violet-500 font-bold p-1 rounded-md"
          onClick={() => setShow(false)}
        >
          {title}
        </Link>
      ))}
    </>
  );
};

export default Links;
