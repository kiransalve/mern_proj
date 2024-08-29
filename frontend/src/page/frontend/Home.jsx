import Hero from "../../components/frontend-components/Hero";
import Department from "../../components/frontend-components/Department";
import Biography from "../../components/frontend-components/Biography";
import Messageform from "../../components/frontend-components/Messageform";
const Home = () => {
  return (
    <div>
      <Hero
        title={"Welcome to Medical Institute "}
        subtitle={"Your Trusted provider"}
        imageUrl={"/hero.png"}
      />
      <Department />
      <Biography imageUrl={"/about.png"} />
      <Messageform />
    </div>
  );
};

export default Home;
