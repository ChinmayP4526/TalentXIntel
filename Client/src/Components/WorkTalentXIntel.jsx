import React from 'react'
import "../css/workTalentXIntel.css";
import education_hats_throwing from "../assets/education_hats_throwing.jpeg";

const WorkTalentXIntel = () => {
    return (
        <div className="work-container">

            <div className="black-op"></div>

            <img
                className="edu"
                src={education_hats_throwing}
                alt="education hats"
            />

            {/* LEFT CONTENT */}
            <div className="work-left">
                <h1>How TalentXIntel Works ?</h1>

                <p className="work-subtitle">
                    From resume upload to career readiness — your path is guided step by step.
                </p>

                <div className="roadmap">

                    <div className="roadmap-item">
                        <div className="circle">1</div>
                        <div className="content">
                            <div className="step-box">Create Your Skill Profile</div>
                            <p>Upload your resume and list your skills in minutes.</p>
                        </div>
                    </div>

                    <div className="roadmap-item">
                        <div className="circle">2</div>
                        <div className="content">
                            <div className="step-box">Select Your Target Role</div>
                            <p>Choose a job role and let AI analyze your readiness.</p>
                        </div>
                    </div>

                    <div className="roadmap-item">
                        <div className="circle">3</div>
                        <div className="content">
                            <div className="step-box">Identify Skill Gaps</div>
                            <p>See missing skills, weak areas, and priority improvements.</p>
                        </div>
                    </div>

                    <div className="roadmap-item">
                        <div className="circle">4</div>
                        <div className="content">
                            <div className="step-box">Follow a Personalized Roadmap</div>
                            <p>Get a structured plan to become industry ready.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDE AI CARD */}
            <div className="ai-card">
                <h3>AI Analysis Preview</h3>

                <div className="ai-item">
                    <span>Resume Score</span>
                    <strong>82%</strong>
                </div>

                <div className="ai-item">
                    <span>Role Match</span>
                    <strong>Frontend Dev</strong>
                </div>

                <div className="ai-item">
                    <span>Missing Skills</span>
                    <strong>React, System Design</strong>
                </div>

                <button className="ai-btn">View Full Report →</button>
            </div>

        </div>
    )
}

export default WorkTalentXIntel