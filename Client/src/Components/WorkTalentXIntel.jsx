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
                alt="education hats throwing"
            />

            <div className="work-texts">
                <h1>How TalentXIntel Works ?</h1>
            </div>

            <div className="steps">
                <div className="step-item">
                    <div className="step-box">
                        <h3>Step 1 : Create Your Skill Profile</h3>
                    </div>
                    <p>Upload your resume and list your skills in minutes.</p>
                </div>

                <div className="step-item">
                    <div className="step-box">
                        <h3>Step 2 : Select Your Target Role</h3>
                    </div>
                    <p>Choose a job role and let our engine analyze your readiness.</p>
                </div>

                <div className="step-item">
                    <div className="step-box">
                        <h3>Step 3 : Identify Skill Gaps</h3>
                    </div>
                    <p>See missing skills, weak areas, and priority improvements.</p>
                </div>

                <div className="step-item">
                    <div className="step-box">
                        <h3>Step 4 : Follow a Personalized Roadmap</h3>
                    </div>
                    <p>Get a structured plan to move closer to industry readiness.</p>
                </div>
            </div>
        </div>
    )
}

export default WorkTalentXIntel