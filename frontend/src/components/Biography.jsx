import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>BioGraphy</p>
        <h3>Who we are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorem
          eum quo sint. Quibusdam nihil quam cumque dignissimos soluta commodi
          praesentium, dolorem vero necessitatibus fugit omnis inventore!
          Veniam, a repellendus?
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus dolore voluptate officia explicabo delectus illo?
        </p>
      </div>
    </div>
  );
};

export default Biography;
