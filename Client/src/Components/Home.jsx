import React from "react";
import Navbar from "./Navbar";
import "../css/home.css";
import education_image from "../assets/education_image.jpg";
// import education_hats_throwing from "../assets/education_hats_throwing.jpeg";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />

      <div className="hero-container">
        <div className="black-op"></div>
        <img className="edu" src={education_image} alt="education image" />

        {/* Hero Text */}
        <div className="hero-texts position-absolute top-50 start-0 translate-middle-y ps-5">
          <h1 className="heads fw-bold text-white">
            Welcome to TalentXIntel <br />
            Understand your Skills <br />
            Align with Industry. <br />
            Get Career-ready.
          </h1>
        </div>
      </div>

      <div className="main-content">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Consequuntur iure modi ab minima tempora, quae, sunt quasi
          accusantium fugit aspernatur porro...
        </p>
      </div>
    </div>
  );
};

export default Home;