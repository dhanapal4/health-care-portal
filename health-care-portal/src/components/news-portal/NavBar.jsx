import React, { useState } from "react";
import './NavBar.css';
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((v) => !v);

    return (
        <header className="nc-navbar">
            <div className="nc-container">
                <div className="nc-brand">
                    <a href="/" className="nc-logo" aria-label="Health Care Portal">
                        HealthCare
                    </a>

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
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">Health Topics</a>
                        </li>
                        <li>
                            <a href="/services">Services</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}