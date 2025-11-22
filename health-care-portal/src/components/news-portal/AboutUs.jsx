import React from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-us">
      <div className="container hero-inner">
        <h1>About Us</h1>
        <p className="subtitle">
          We provide reliable health information, preventive care guidance, and
          resources to help you and your community stay well.
        </p>
      </div>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To empower individuals with trustworthy health information, promote
          preventive care, and make wellness resources accessible to everyone.
        </p>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <h3>Clinical Advisors</h3>
            <p>Healthcare professionals ensuring accuracy of content.</p>
          </div>
          <div className="team-card">
            <h3>Developers</h3>
            <p>Building tools and features to make care easier to access.</p>
          </div>
          <div className="team-card">
            <h3>Community Outreach</h3>
            <p>Connecting resources with those who need them most.</p>
          </div>
        </div>
      </section>

      <div className="about-cta">
        <button onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </div>
  );
}

export default AboutUs;
