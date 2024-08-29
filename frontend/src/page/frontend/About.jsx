import Biography from "../../components/frontend-components/Biography";
import Hero from "../../components/frontend-components/Hero";

const About = () => {
  return (
    <div>
      {" "}
      <Hero
        title={"Welcome to Medical Institute "}
        subtitle={"Your Trusted provider"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png "} />
    </div>
  );
};

export default About;
