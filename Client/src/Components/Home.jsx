import React from "react";
import Navbar from "./Navbar";
import "../css/home.css";
import education_image from "../assets/education_image.jpg";
import right_arrow from "../assets/right-arrow.png"
import WorkTalentXIntel from "./WorkTalentXIntel";
import Cards_Carousel from "./Cards_Carousel";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />

      <div className="hero-container">
        <div className="black-op"></div>
        <img className="edu" src={education_image} alt="education image" />

      </div>
      {/* Hero Text */}
      <div className="hero-texts ps-5 ">
        <h1 className="heads text-white">
          Welcome to TalentXIntel <br />
          Understand your Skills <br />
          Align with Industry. <br />
          Get Career-ready.
        </h1>
        <p className="text-white fs-3 ">TalentXIntel analyzes your skills, resume, and learning progress to match you with industry roles and highlight exactly what you need to improve. <br /></p>
        <p className="text-white fs-4">
          Built for students, institutions, and recruiters seeking data-driven career insights.</p>

        <button className="btn start d-flex justify-content-center align-items-center gap-2">
          Get Started
          <img src={right_arrow} alt="arrow" className="btn-icon" />
        </button>
      </div>

      <WorkTalentXIntel />
      <h1 className="getFromUs">What you get from us?</h1>
      <Cards_Carousel />

    </div>
  );
};

export default Home;