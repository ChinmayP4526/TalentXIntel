import React from 'react'
import ThemeToggle from './ThemeToggle'
import Logo_Light from "../assets/TalentXIntel Logos/TalentXIntel_Light.png"
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { navLinksDashboard } from "../../constants/index.js"
const NavbarDashboard = () => {
  return (
    <div>
      <nav className="navbar fixed-top">
        <div className="container-fluid">

          <div className="d-flex justify-content-between align-items-center w-100">

            {/* Left: Logo */}
            <Link className="navbar-brand d-flex align-items-center gap-2 text-white" to="/dashboard">
              <img
                src={Logo_Light}
                alt="Logo"
                className="logo"
              />
              TalentXIntel
            </Link>

            <ul className="dashboard-nav-links">
              {navLinksDashboard.map((link) => (
                <li key={link.title}>
                  <NavLink
                    to={link.id ? `/dashboard/${link.id}` : "/dashboard"}
                    end={link.id === ""}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ThemeToggle />


          </div>

        </div>

      </nav>
    </div>
  )
}

export default NavbarDashboard

// ul {
//             @apply flex-center lg:gap-12 gap-7;
//         }