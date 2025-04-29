import React from 'react';
import { NavLink } from "react-router-dom"

function Footer() {
  return (
    <>
    
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Left Column */}
          <div>
            <h3 className="footer-heading">ASUppalTradingGmbH</h3>
            <nav className="footer-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "footer-link active-link" : "footer-link"}>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? "footer-link active-link" : "footer-link"}>About Us</NavLink>
<NavLink to="/categories" className={({ isActive }) => isActive ? "footer-link active-link" : "footer-link"}>Categories</NavLink>
<NavLink to="/contact" className={({ isActive }) => isActive ? "footer-link active-link" : "footer-link"}>Contact</NavLink>

            </nav>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="footer-heading">Contact us</h3>
            <div className="contact-info">
              <p>Germany Obere Zahlbachere str 56 Mainz 55131</p>
              <p className="contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="contact-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +49 162 9775400
              </p>
              <p className="contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="contact-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:sohaibuppal65@gmail.com" className="footer-link">
                  sohaibuppal65@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  
    </>
  );
}

export default Footer;
