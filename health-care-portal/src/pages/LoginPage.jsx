import React, { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Healthcare Provider')

  function submit(e){
    e.preventDefault()
    console.log('login page submit', {email, password, role})
    // TODO: integrate real auth
    alert('Submitted — check console (placeholder)')
  }

  return (
    <div className="login-page-wrap">
      <div className="login-card">
        <h2 className="login-title">Healthcare Portal</h2>
        <p className="login-sub">Login to your account</p>

        <form onSubmit={submit} className="login-form">
          <label>
            <div className="label-text">Email</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>

          <label>
            <div className="label-text">Password</div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </label>

          <label>
            <div className="label-text">Login as:</div>
            <select value={role} onChange={e=>setRole(e.target.value)}>
              <option>Healthcare Provider</option>
              <option>Patient</option>
            </select>
          </label>

          <button className="login-btn" type="submit">Login</button>
        </form>

        <div className="login-links">
          <a href="#">Forgot Password?</a>
          <div>New User? <a href="#">Register here</a></div>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
