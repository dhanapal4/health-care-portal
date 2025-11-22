import React from 'react'

export default function Header() {
  return (
    <header className="bg-sky-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="font-bold text-lg">HCLTech Healthcare</div>
        <nav className="hidden md:flex space-x-6 font-semibold">
          <a href="#" className="hover:underline">Home</a>
          <a href="#topics" className="hover:underline">Health Topics</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  )
}
