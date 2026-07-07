import React from 'react'
import "../css/carousel.css"
import bar_graph from "../assets/Cards-images/bar-graph.png"
import brainstorm from "../assets/Cards-images/brainstorm.png"
import road from "../assets/Cards-images/road.png"
import target from "../assets/Cards-images/target.png"
const Carousel = () => {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3500">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={target} alt="target" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Skill Match Analysis</h3>
                            <p>Understand how closely your skills match real job roles.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={bar_graph} alt="bar_graph" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Career Readiness Score</h3>
                            <p>Track your progress with a clear, measurable score.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={road} alt="road" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Learning Roadmap</h3>
                            <p>Focus on what truly matters — no guesswork.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={brainstorm} alt="brainstorm" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Talent Intelligence (Recruiters)</h3>
                            <p>Access structured insights, not just resumes.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
