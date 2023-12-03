import React from 'react';
import '../assets/css/Header.css'; // You can create a separate CSS file for the header
import { BiWorld } from "react-icons/bi";

function Header() {
  return (
    <header className="header-container">
      <h1 className="header-heading"><BiWorld /> Global Inflation Dynamic </h1>
      
      <nav className="header-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
