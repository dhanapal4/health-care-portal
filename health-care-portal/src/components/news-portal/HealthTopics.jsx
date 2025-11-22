// ...existing code...
import React, { useState } from "react";
import "./HealthTopics.css";
import { useNavigate } from "react-router-dom";

export default function HealthTopics() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const topics = [
    {
      id: 1,
      title: "Nutrition",
      summary: "Healthy eating tips, meal planning and nutrients.",
    },
    {
      id: 2,
      title: "Exercise",
      summary: "Workouts, mobility and activity recommendations.",
    },
    {
      id: 3,
      title: "Mental Health",
      summary: "Stress management, therapy and wellbeing.",
    },
    { id: 4, title: "Sleep", summary: "Sleep hygiene and improving rest." },
    {
      id: 5,
      title: "Chronic Conditions",
      summary: "Managing diabetes, hypertension and more.",
    },
  ];

  const filtered = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="healthtopics-root">
      <div className="ht-container">
        <h1>Health Topics</h1>

        <div className="ht-search">
          <input
            type="search"
            placeholder="Search topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search health topics"
          />
        </div>

        <div className="ht-grid">
          {filtered.map((t) => (
            <article className="ht-card" key={t.id}>
              <h2>{t.title}</h2>
              <p>{t.summary}</p>
              <button
                type="button"
                onClick={() => {
                  console.log("open topic", t.id);
                  navigate("/contact", { state: { topic: t.title } });
                }}
              >
                Learn more
              </button>
            </article>
          ))}

          {filtered.length === 0 && (
            <p className="ht-empty">No topics match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
