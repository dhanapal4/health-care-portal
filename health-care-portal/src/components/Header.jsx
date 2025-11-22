import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">HCLTech Healthcare</div>
        <nav className="main-nav">
          <a href="#">Home</a>
          <a href="#topics">Health Topics</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
