import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-sky-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="font-bold text-lg">HCLTech Healthcare</div>
        <nav className="hidden md:flex space-x-6 font-semibold">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  )
}
