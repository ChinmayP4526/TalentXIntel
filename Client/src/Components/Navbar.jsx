import React from 'react'
import Logo_Light from "../assets/TalentXIntel Logos/TalentXIntel_Light.png"
import "../css/navbar.css"
import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
const Navbar = () => {
  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        
        <div className="d-flex justify-content-between align-items-center w-100">
          
          {/* Left: Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 text-white" to="/">
            <img
              src={Logo_Light}
              alt="Logo"
              className="logo"
            />
            TalentXIntel
          </Link>
          <ThemeToggle/>
          {/* Right: Buttons */}
          <div className="d-flex gap-3">
            <button className="btn log">Login</button>
            <button className="btn sign">Signup</button>
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar
