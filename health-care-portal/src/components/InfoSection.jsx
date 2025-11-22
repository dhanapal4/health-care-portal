import React from 'react'

function Card({title, children}){
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{children}</p>
      <a className="read-more" href="#">Read More →</a>
    </article>
  )
}

export default function InfoSection(){
  return (
    <section className="info-section">
      <div className="container">
        <h2 className="section-title">Latest Health Information</h2>
        <div className="cards">
          <Card title="COVID-19 Updates">Stay informed about the latest COVID-19 guidelines and vaccination information.</Card>
          <Card title="Seasonal Flu Prevention">Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.</Card>
          <Card title="Mental Health Awareness">Explore resources and support options for maintaining good mental health.</Card>
        </div>
      </div>
    </section>
  )
}
