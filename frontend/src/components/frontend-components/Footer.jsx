import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 bg-white text-[#8570ed]  flex items-center justify-center w-full shadow-inner">
      <div className="font-semibold text-center w-full">
        MediBooker &copy; {currentYear} | Made by Kiran Salve | Images credit{" "}
        <Link to={"https://www.freepik.com/"} className="underline">
          Freepik.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
