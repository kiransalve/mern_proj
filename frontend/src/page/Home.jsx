import Hero from "../components/Hero";
import Department from "../components/Department";
import Biography from "../components/Biography";
import Messageform from "../components/Messageform";
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
