import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1>Healthcare Wellness &amp; Preventive Care Portal</h1>
        <p className="subtitle">Your partner in achieving wellness goals and maintaining preventive health</p>
        <button className="cta" onClick={() => navigate('/login')}>Login to Portal</button>
      </div>
    </section>
  )
}
