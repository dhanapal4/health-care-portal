import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import Login from './components/Login'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="site-root">
      <Header />

      <main>
        <Hero onLogin={() => setShowLogin(true)} />
        <InfoSection />
      </main>

      <Footer />

      <Login open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}

export default App
