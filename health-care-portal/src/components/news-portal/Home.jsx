// ...existing code...
import React from "react";
import data from "./homeData.json";
import "./Home.css";

function Home() {
  const handleClick = (url) => {
    window.open(url || "https://www.bing.com", "_blank", "noopener,noreferrer");
  };
// ...existing code...
{
  "items": [
    {
      "id": 1,
      "title": "COVID-19 Updates",
      "summary": "Stay informed with the latest COVID-19 news and guidelines.",
      "url": "https://www.bing.com"
    },
    {
      "id": 2,
      "title": "Seasonal Flu Prevention",
      "summary": "Tips and resources to protect yourself from the flu this season.",
      "url": "https://www.bing.com"
    },
    {
      "id": 3,
      "title": "Mental Health Awareness",
      "summary": "Learn about mental health resources and support.",
      "url": "https://www.bing.com"
    },
    {
      "id": 4,
      "title": "Nutrition Tips",
      "summary": "Discover healthy eating habits and recipes.",
      "url": "https://www.bing.com"
    }
  ]
}
// ...existing code...
  return (
    <div className="news-home">
      <h1>Latest Health Information</h1>

      <div className="boxes">
        {data.items.map((card) => (
          <div className="card" key={card.id}>
            <h2>{card.title}</h2>
            <p>{card.summary}</p>
            <button onClick={() => handleClick(card.url)}>
              {card.cta ?? "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
