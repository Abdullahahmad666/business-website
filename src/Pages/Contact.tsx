import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Header from "../Components/Header.tsx"
import Footer from "../Components/Footer.tsx"
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  emailjs.send(
    'service_z62x6r3',      // e.g. 'smtp_service_123'
    'template_eneux2l',     // e.g. 'template_abcd12'
    formData,
    'M_DT9HlnT38Urw4IF'       // e.g. 'abcD123XYZ'
  )
  .then((response) => {
    console.log('Email sent successfully!', response);
    alert("Message sent! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  })
  .catch((error) => {
    console.error('Error sending email:', error);
    alert("There was an error sending your message.");
  });
};


    
      return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="top-bar-item space-x-6">
          <div className="top-bar-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="top-bar-icon"
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
            <span>+49 162 9775400</span>
          </div>
          <div className="top-bar-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="top-bar-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Mon - Sun</span>
          </div>
        </div>
      </div>
      <div className="top-bar-right">
        <div className="top-bar-item space-x-4">
          <div className="top-bar-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="top-bar-icon"
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
            <a href="mailto:info@asuppaltradinggmbh.com">info@asuppaltradinggmbh.com</a>
          </div>
          <div className="top-bar-item space-x-2">
            <a href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Logo Section */}
    <div className="logo-section">
  <div className="logo-container">
    <div className="logo-image">
      <img src="/asuppal/logo.jpg" alt="AS Uppal Logo" />
    </div>
  </div>
</div>

          <Header />
          <main className="flex-grow">
            <div className="contact-container">
              {/* Contact Info (Left Column) */}
              <div className="contact-info">
                {/* TALK TO US */}
                <div className="contact-section">
                  <div className="contact-icon">
                    {/* phone icon */}
                  </div>
                  <h2 className="contact-heading">TALK TO US</h2>
                  <div className="contact-text">
                    <strong>Telephone:</strong> +49 162 9775400
                  </div>
                </div>
    
                {/* EMAIL */}
                <div className="contact-section">
                  <div className="contact-icon">
                    {/* mail icon */}
                  </div>
                  <h2 className="contact-heading">CONTACT US</h2>
                  <div className="contact-text">
                    <a href="mailto:info@asuppaltradinggmbh.com" className="text-black hover:underline">
                    info@asuppaltradinggmbh.com
                    </a>
                  </div>
                </div>
    
                {/* LOCATION */}
                <div className="contact-section">
                  <div className="contact-icon">
                    {/* location icon */}
                  </div>
                  <h2 className="contact-heading">LOCATION</h2>
                  <div className="contact-text location-text">
                    Germany Obere Zahlbachere str 56 Mainz 55131
                  </div>
                </div>
              </div>
    
              {/* Contact Form (Right Column) */}
              <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button type="submit" className="submit-button">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
}

export default Contact
