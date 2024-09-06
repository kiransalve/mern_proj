import Hero from "../../components/frontend-components/Hero";
import Department from "../../components/frontend-components/Department";
import DoctorCards from "../../components/frontend-components/DoctorCards";
import Schedule from "../../components/frontend-components/Schedule";

const Home = () => {
  return (
    <div>
      <Hero />
      <Department />
      <DoctorCards />
      <Schedule />
    </div>
  );
};

export default Home;
