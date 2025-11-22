import React from 'react'

export default function Footer(){
  return (
    <footer className="py-6 text-center text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-5">© {new Date().getFullYear()} HCLTech Healthcare</div>
    </footer>
  )
}
