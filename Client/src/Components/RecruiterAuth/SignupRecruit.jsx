import React, { useState } from 'react'
import "../../css/auth.css"
import ThemeToggle from '../ThemeToggle'
import eye_open from "../../assets/eye_open.png"
import eye_closed from "../../assets/eye_closed.png"
import { Link } from "react-router-dom"


const SignupRecruit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  return (
    <div className="login-wrapper custom-bg">
      <div >

        <div className="position-absolute top-0 start-0 w-100 p-3" style={{ zIndex: 10 }}>
          <ThemeToggle />
        </div>
        <svg
          className="curve-bg custom-svg"
          viewBox="0 0 743 1014"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M679.165 1018.69C359.196 562.279 916 361.033 679.165 -6.60522C442.331 -374.243 0 -6.60522 0 -6.60522V1018.69C0 1018.69 999.135 1475.09 679.165 1018.69Z"

          />
        </svg>

      </div>
      <div className='greet'>
        <h2>Welcome to TalentXIntel !</h2>
        <p>Join to evaluate skills,</p><p> readiness, and future  </p ><p>potential.</p>
      </div>


      <div className="login-content form-text-color">
        <div className='flex flex-column mt-3'>
          <h2>Sign Up</h2>
          <p>as a Recruiter</p>
          <p className='fs-6'>Already have an Account? <Link to="/recruitlogin"><span className='link-color'>Login</span></Link></p>
        </div>
        <div>
          <form className='auth-form recruit-form'>
            <div className="mb-3">
              <label htmlFor="student-name" className="form-label">Full Name</label>
              <input type="text" className="form-control input" id="student-name" placeholder="john wick" value={name} onChange={({ target }) => setName(target.value)} />


            </div>
            <div className="mb-3">
              <label htmlFor="student-email" className="form-label">Email address</label>
              <input type="email" className="form-control input" id="student-email" aria-describedby="email" placeholder="john@example.com" value={email} onChange={({ target }) => setEmail(target.value)} />

            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group-wrapper position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control input pe-5" // pe-5 adds padding for the icon
                  id="password"
                  placeholder="Min 5 Characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Only show icon if there is text in the password field */}
                {password.length > 0 && (
                  <img
                    src={showPassword ? eye_open : eye_closed}
                    alt="toggle password"
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="recruit-role" className="form-label">Role / Designation</label>
              <input type="text" className="form-control input" id="recruit-role" placeholder="HR, Owner" value={role} onChange={({ target }) => setRole(target.value)} />


            </div>
            <div className="mb-3">
              <label htmlFor="recruit-company" className="form-label">Company / Institution Name</label>
              <input type="text" className="form-control input" id="recruit-company" placeholder="Google, Microsoft" value={company} onChange={({ target }) => setCompany(target.value)} />


            </div>
           

          </form>
        </div>
        <div className='flex flex-column my-2'>

          <button className='btn link-color-btn text-white my-2'>Create Account</button>
          <p className='fs-6 mb-3'>Not a Recruiter? <Link to="/studlogin"><span className='link-color'>Login</span></Link>/<Link to="/studsignup"><span className='link-color'>Signup</span></Link> as a Student</p>
        </div>
      </div>

    </div>
  )
}

export default SignupRecruit
