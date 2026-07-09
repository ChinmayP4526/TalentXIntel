import React, { useState } from 'react'
import "../../css/auth.css"
import ThemeToggle from '../ThemeToggle'
import eye_open from "../../assets/eye_open.png"
import eye_closed from "../../assets/eye_closed.png"
import { Link, useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:5000"
const SignupRecruit = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", role: "", company: "" })
  const navigate = useNavigate()

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(`${BASE_URL}/api/recruitauth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, role: credentials.role, company: credentials.company })

      })
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem('token', json.authToken)
        props.showAlert("User Created Successfully", "success")
        navigate("/recruitDashboard")
      }
      else {
        props.showAlert(json.error || "Signup Failed", "danger");
      }
    }
    catch (error) {
      console.error(error);

      props.showAlert("Server Error", "danger");

    }

  }

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
          <form className='auth-form recruit-form' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="student-name" className="form-label">Full Name</label>
              <input type="text" className="form-control input" id="student-name" name='name' placeholder="john wick" value={credentials.name} onChange={onChange} />


            </div>

            <div className="mb-3">
              <label htmlFor="student-email" className="form-label">Email address</label>
              <input type="email" className="form-control input" id="student-email" name='email' aria-describedby="email" placeholder="john@example.com" value={credentials.email} onChange={onChange} />

            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group-wrapper position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control input pe-5" // pe-5 adds padding for the icon
                  id="password"
                  name='password'
                  placeholder="Min 5 Characters"
                  value={credentials.password}
                  onChange={onChange}
                />

                {/* Only show icon if there is text in the password field */}
                {credentials.password.length > 0 && (
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
              <input type="text" className="form-control input" id="recruit-role" name='role' placeholder="HR, Owner" value={credentials.role} onChange={onChange} />


            </div>
            <div className="mb-3">
              <label htmlFor="recruit-company" className="form-label">Company / Institution Name</label>
              <input type="text" className="form-control input" id="recruit-company" name='company' placeholder="Google, Microsoft" value={credentials.company} onChange={onChange} />


            </div>

            <div className='flex flex-column my-2'>

              <button type='submit' className='btn link-color-btn text-white my-2'>Create Account</button>
              <p className='fs-6 mb-3'>Not a Recruiter? <Link to="/studlogin"><span className='link-color'>Login</span></Link>/<Link to="/studsignup"><span className='link-color'>Signup</span></Link> as a Student</p>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

export default SignupRecruit
