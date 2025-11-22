import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="nc-navbar">
      <div className="nc-container">
        <div className="nc-brand">
          <NavLink to="/" className="nc-logo" onClick={close} end>
            HCLTech Healthcare
          </NavLink>

          <button
            className="nc-toggle"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={toggle}
          >
            <span className="nc-hamburger" />
          </button>
        </div>

        <nav className={`nc-nav ${open ? "open" : ""}`} aria-label="Main">
          <ul>
            <li>
              <NavLink to="/" onClick={close} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/health-topics" onClick={close}>
                Health Topics
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={close}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={close}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
