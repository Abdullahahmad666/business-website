import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="main-nav bg-black text-white py-4">
      <div className="container mx-auto flex justify-center">
        <ul className="nav-list flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link hover:text-amber-500 transition-colors ${
                  isActive ? "text-amber-500 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link hover:text-amber-500 transition-colors ${
                  isActive ? "text-amber-500 font-semibold" : ""
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `nav-link hover:text-amber-500 transition-colors ${
                  isActive ? "text-amber-500 font-semibold" : ""
                }`
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link hover:text-amber-500 transition-colors ${
                  isActive ? "text-amber-500 font-semibold" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
