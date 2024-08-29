import React from "react";

const Hero = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <div className="subtitle">{subtitle}</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          temporibus, totam explicabo recusandae fuga hic laborum odit. Eius
          nisi maxime molestiae aliquam quos dignissimos labore, pariatur
          expedita amet sed ea doloremque explicabo consectetur numquam cum
          porro a temporibus, consequuntur excepturi dolores veritatis adipisci
          error dolor omnis. Fuga numquam quam aliquid!
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
