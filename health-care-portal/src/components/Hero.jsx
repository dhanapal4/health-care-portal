import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="bg-sky-50 py-20">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">Healthcare Wellness &amp; Preventive Care Portal</h1>
        <p className="text-slate-500 mt-4 mb-8">Your partner in achieving wellness goals and maintaining preventive health</p>
        <button className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-10 rounded-lg font-semibold shadow" onClick={() => navigate('/login')}>Login to Portal</button>
      </div>
    </section>
  )
}
