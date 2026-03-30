import React, { useState } from 'react'
import Logo_Light from "../assets/TalentXIntel Logos/TalentXIntel_Light.png"
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import IdentityModal from './Modal/IdentityModal'

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("")

  const handleClick = (type) => {
    setActionType(type);
    setShowModal(true)
  }

  const handleSelection = (role) => {
    setShowModal(false)

    if (actionType === "login") {
      navigate(`/${role}login`)
    }
    else {
      navigate(`/${role}signup`)
    }

  }
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
          <ThemeToggle />
          {/* Right: Buttons */}
          <div className="d-flex gap-3">
            <button className="btn log" onClick={() => { handleClick("login") }}>Login</button>
            <button className="btn sign" onClick={() => { handleClick("signup") }}>Signup</button>
          </div>

        </div>

      </div>
      {showModal && (
        <IdentityModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelection}
        />
      )}
    </nav>
  )
}

export default Navbar
