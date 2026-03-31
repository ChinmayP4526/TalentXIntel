import React from 'react'
import target from "../assets/Cards-images/target.png"
import road from "../assets/Cards-images/road.png"
import brainstorm from "../assets/Cards-images/brainstorm.png"
import bar_graph from "../assets/Cards-images/bar-graph.png"

const Cards_Carousel = () => {
    return (
        <div className="container py-5">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                {/* Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>

                {/* Carousel Content */}
                <div className="carousel-inner">
                    
                    {/* Card 1 */}
                    <div className="carousel-item active">
                        <div className="d-flex justify-content-center">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={target} className="card-img-top" alt="Skill Match" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Skill Match Analysis</h5>
                                    <p className="card-text">Understand how closely your skills match real job roles.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="carousel-item">
                        <div className="d-flex justify-content-center">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={road} className="card-img-top" alt="Roadmap" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Learning Roadmap</h5>
                                    <p className="card-text">Focus on what truly matters — no guesswork.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="carousel-item">
                        <div className="d-flex justify-content-center">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={bar_graph} className="card-img-top" alt="Score" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Career Readiness Score</h5>
                                    <p className="card-text">Track your progress with a clear, measurable score.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="carousel-item">
                        <div className="d-flex justify-content-center">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={brainstorm} className="card-img-top" alt="Intelligence" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Talent Intelligence</h5>
                                    <p className="card-text">Access structured insights, not just resumes.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Cards_Carousel