import React, { useState } from 'react'
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
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-sky-600 font-bold text-xl text-center">Healthcare Portal</h2>
        <p className="text-slate-500 text-center mb-4">Login to your account</p>

        <form onSubmit={submit} className="space-y-3">
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

        <div className="mt-4 text-center text-sky-600 text-sm">
          <div><a href="#" className="text-sky-600">Forgot Password?</a></div>
          <div className="mt-1">New User? <a href="#" className="underline">Register here</a></div>
          <div className="mt-2"><Link to="/" className="text-slate-600">Back to Home</Link></div>
        </div>
      </div>
    </div>
  )
}
