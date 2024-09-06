import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialMediaIcons = () => {
  return (
    <div className="flex gap-6 justify-center mt-11">
      <Link
        to="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 bg-white  p-1 rounded-md hover:text-blue-800"
      >
        <FaFacebookF size={24} />
      </Link>
      <Link
        to="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 bg-white  p-1 rounded-md hover:text-blue-600"
      >
        <FaTwitter size={24} />
      </Link>
      <Link
        to="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 bg-white  p-1 rounded-md hover:text-pink-700"
      >
        <FaInstagram size={24} />
      </Link>
      <Link
        to="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 bg-white  p-1 rounded-md hover:text-blue-900"
      >
        <FaLinkedinIn size={24} />
      </Link>
    </div>
  );
};

export default SocialMediaIcons;
