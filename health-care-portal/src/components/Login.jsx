import React, { useEffect, useRef, useState } from 'react'

export default function Login({ open, onClose }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Healthcare Provider')
  const overlayRef = useRef(null)

  useEffect(()=>{
    function onKey(e){
      if(e.key === 'Escape') onClose()
    }
    if(open) document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[open,onClose])

  if(!open) return null

  function handleOverlayClick(e){
    if(e.target === overlayRef.current) onClose()
  }

  function submit(e){
    e.preventDefault()
    // Placeholder: handle authentication here
    console.log('login', {email, password, role})
    onClose()
  }

  return (
    <div className="login-overlay" ref={overlayRef} onMouseDown={handleOverlayClick}>
      <div className="login-card" role="dialog" aria-modal="true" aria-label="Login">
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
          <button className="link-back" onClick={onClose}>← Back to Home</button>
        </div>
      </div>
    </div>
  )
}
