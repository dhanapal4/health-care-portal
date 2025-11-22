// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "General Practice",
      desc: "Primary care consultations, routine checks and referrals.",
    },
    {
      id: 2,
      title: "Telehealth Visits",
      desc: "Video appointments for non-emergency care and follow-ups.",
    },
    {
      id: 3,
      title: "Vaccinations",
      desc: "Seasonal and travel vaccinations administered by trained staff.",
    },
    {
      id: 4,
      title: "Chronic Care",
      desc: "Ongoing management for diabetes, hypertension and asthma.",
    },
  ];

  return (
    <div className="services-root">
      <div className="sv-container">
        <h1>Our Services</h1>
        <p className="sv-desc">
          Explore services we offer and contact us to schedule.
        </p>

        <div className="sv-grid">
          {services.map((s) => (
            <article className="sv-card" key={s.id}>
              <div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </div>
              <div className="sv-actions">
                <button onClick={() => navigate("/contact")}>
                  Book / Contact
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
