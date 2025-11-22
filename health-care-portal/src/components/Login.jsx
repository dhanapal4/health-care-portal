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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6" ref={overlayRef} onMouseDown={handleOverlayClick}>
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg text-center" role="dialog" aria-modal="true" aria-label="Login">
        <h2 className="text-sky-600 font-bold text-xl">Healthcare Portal</h2>
        <p className="text-slate-500 mb-4">Login to your account</p>

        <form onSubmit={submit} className="space-y-3 text-left">
          <label className="block">
            <div className="text-sm font-semibold mb-1">Email</div>
            <input className="w-full px-3 py-2 border rounded-md" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Password</div>
            <input className="w-full px-3 py-2 border rounded-md" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Login as:</div>
            <select className="w-full px-3 py-2 border rounded-md" value={role} onChange={e=>setRole(e.target.value)}>
              <option>Healthcare Provider</option>
              <option>Patient</option>
            </select>
          </label>

          <button className="w-full bg-sky-500 text-white py-2 rounded-md font-semibold" type="submit">Login</button>
        </form>

        <div className="mt-4 text-sky-600 text-sm space-y-2">
          <div><a href="#" className="text-sky-600">Forgot Password?</a></div>
          <div>New User? <a href="#" className="underline">Register here</a></div>
          <button className="mt-2 text-sky-600" onClick={onClose}>← Back to Home</button>
        </div>
      </div>
    </div>
  )
}
