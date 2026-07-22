import React from 'react'
import ThemeToggle from './ThemeToggle'
import Logo_Light from "../assets/TalentXIntel Logos/TalentXIntel_Light.png"
import Logo_Dark from "../assets/TalentXIntel Logos/TalentXIntel_Dark.png"
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { navLinksDashboard } from "../../constants/index.js"
import ProfileNav from './ProfileNav.jsx'

import { useTheme } from "../context/ThemeContext";
const NavbarDashboard = () => {

  const navigate = useNavigate()
  const { theme } = useTheme();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/studlogin" replace />;
  }


  const handleLogout = () => {
    localStorage.removeItem('token');
    // props.showAlert("Logged out successfully", "success");
    navigate("/", { replace: true });
  }

  return (
    <div>
      <nav className="navbar fixed-top">
        <div className="container-fluid">

          <div className="d-flex justify-content-between align-items-center w-100">

            {/* Left: Logo */}
            <Link className="navbar-brand d-flex align-items-center gap-2 text-white" to="/dashboard">
              <img
                src={theme === "dark" ? Logo_Dark : Logo_Light}
                alt="Logo"
                className="logo"
              />
              TalentXIntel
            </Link>
            <ProfileNav />
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

            <div className='d-flex mr-3 align-items-center justify-content-center w-25 gap-5'>
              <ThemeToggle />


              <button className="btn log" onClick={handleLogout} style={{ "width": "30%", "height": "30%" }}>Logout</button>
            </div>

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