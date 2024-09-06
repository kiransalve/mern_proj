import {
  FaInfoCircle,
  FaBullseye,
  FaTools,
  FaUsers,
  FaHandshake,
  FaEnvelope,
} from "react-icons/fa";
import SocialMediaIcons from "./SocialMediaIcons";

// Reusable Section Component
const Section = ({ icon: Icon, heading, content, reverse }) => {
  return (
    <div
      className={`flex shadow-xl lg:p-20 md:p-10 py-11 px-5 flex-col lg:flex-row${
        reverse ? "-reverse" : ""
      } gap-11`}
    >
      <div className="heading text-center flex-1 items-center flex justify-center">
        <Icon className="inline-block mr-2" />
        {heading}
      </div>
      <div className="flex-1 text-justify">{content}</div>
    </div>
  );
};

const About = () => {
  const sections = [
    {
      icon: FaInfoCircle,
      heading: "About Us",
      content:
        "Welcome to MediBooker, your premier online platform for seamless doctor bookings and exceptional healthcare management. We are dedicated to revolutionizing the way you connect with healthcare professionals, ensuring that quality care is just a click away.",
    },
    {
      icon: FaBullseye,
      heading: "Our Mission",
      content:
        "At MediBooker, our mission is to simplify and enhance the healthcare experience for patients and doctors alike. We believe that accessing quality medical care should be straightforward, convenient, and efficient. By leveraging the power of technology, we aim to bridge the gap between patients and healthcare providers, making healthcare more accessible and manageable for everyone.",
      reverse: true,
    },
    {
      icon: FaTools,
      heading: "What We Do",
      content:
        "MediBooker is designed to offer a comprehensive suite of features that make booking doctor appointments hassle-free. Find and book appointments with top doctors and specialists in your area with just a few taps. Check real-time availability of doctors to schedule appointments that fit your busy lifestyle. Rest assured that your personal information and payment details are protected with our advanced security protocols.",
    },
    {
      icon: FaUsers,
      heading: "Our Team",
      content:
        "MediBooker was founded by a team of healthcare professionals and tech enthusiasts who are passionate about improving the patient experience. Our dedicated team includes experts in healthcare management, software development, and customer support, all working together to bring you the best possible service.",
      reverse: true,
    },
    {
      icon: FaHandshake,
      heading: "Why Choose Us",
      content:
        "User-Centric Design: Our platform is designed with you in mind, ensuring an intuitive and user-friendly experience. Comprehensive Network: We collaborate with a vast network of reputable healthcare providers to offer you a wide range of options. Commitment to Quality: We are committed to maintaining the highest standards of quality and service in all aspects of our platform.",
    },
  ];

  return (
    <div className="md:mx-20 my-11 mx-1 flex flex-col md:gap-10">
      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}

      <div className="flex lg:p-20 md:p-10 py-11 px-5 flex-col gap-11">
        <div className="heading text-center">
          <FaEnvelope className="inline-block mr-2" />
          Get in Touch
        </div>
        <div className="flex-1 text-justify">
          Have questions or feedback? We would love to hear from you! Feel free
          to reach out to our support team at support@medibooker.com or follow
          us on social media to stay updated with the latest news and features.
          <br />
          <br />
          <p>
            Thank you for choosing MediBooker. We look forward to supporting you
            on your journey to better health!
          </p>
        </div>

        <div>
          <SocialMediaIcons />
        </div>
      </div>
    </div>
  );
};

export default About;
