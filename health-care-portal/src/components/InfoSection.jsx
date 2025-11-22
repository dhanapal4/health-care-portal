import React from 'react'

function Card({title, children}){
  return (
    <article className="bg-white rounded-xl p-6 shadow border">
      <h3 className="text-sky-600 font-bold mb-2">{title}</h3>
      <p className="text-slate-600">{children}</p>
      <a className="text-sky-600 font-semibold mt-4 inline-block" href="#">Read More →</a>
    </article>
  )
}

export default function InfoSection(){
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-2xl font-extrabold text-center text-slate-900 mb-8">Latest Health Information</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="COVID-19 Updates">Stay informed about the latest COVID-19 guidelines and vaccination information.</Card>
          <Card title="Seasonal Flu Prevention">Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.</Card>
          <Card title="Mental Health Awareness">Explore resources and support options for maintaining good mental health.</Card>
        </div>
      </div>
    </section>
  )
}
