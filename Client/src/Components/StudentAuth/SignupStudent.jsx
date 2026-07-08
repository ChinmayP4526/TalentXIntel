import React, { useState } from 'react'
import "../../css/auth.css"
import ThemeToggle from '../ThemeToggle'
import eye_open from "../../assets/eye_open.png"
import eye_closed from "../../assets/eye_closed.png"
import { Link, useNavigate } from "react-router-dom"
const BASE_URL = "http://localhost:5000"

const SignupStudent = (props) => {

  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate()

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }
    try {

      const response = await fetch(`${BASE_URL}/api/studauth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      })

      const json = await response.json()
      console.log(json);
      if (json.success) {
        localStorage.setItem('token', json.authToken)
        props.showAlert("User Created Successfully", "success")
        navigate("/dashboard")
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
        <p>Create your profile and</p><p> discover how close you </p ><p>are to your dream role.</p>
      </div>


      <div className="login-content form-text-color">
        {/* Login FORM */}
        <div className='flex flex-column'>
          <h2>Sign Up</h2>
          <p>as a Student</p>
          <p className='fs-6'>Already have an Account? <Link to="/studlogin"><span className='link-color'>Login</span></Link></p>
        </div>
        <div>
          <form className='auth-form' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="student-name" className="form-label">Full Name</label>
              <input type="text" className="form-control input" id="student-name" placeholder="john wick" name='name' onChange={onChange}
                value={credentials.name} />
            </div>

            <div className="mb-3">
              <label htmlFor="student-email" className="form-label">Email address</label>
              <input type="email" className="form-control input" id="student-email" aria-describedby="email" placeholder="john@example.com" onChange={onChange} name='email' value={credentials.email} />

            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group-wrapper position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control input pe-5" // pe-5 adds padding for the icon
                  id="password"
                  placeholder="Min 5 Characters"
                  name='password'
                  minLength={5}
                  value={credentials.password}
                  required
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
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <div className="input-group-wrapper position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control input pe-5" // pe-5 adds padding for the icon
                  id="confirm-password"
                  name='cpassword'
                  onChange={onChange}
                  value={credentials.cpassword}
                  minLength={5}
                  required
                />

                {/* Only show icon if there is text in the password field */}
                {credentials.cpassword.length > 0 && (
                  <img
                    src={showPassword ? eye_open : eye_closed}
                    alt="toggle password"
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>

            <div className='flex flex-column my-2'>

              <button type="submit" className='btn link-color-btn text-white my-2'>Create Account</button>
              <p className='fs-6 my-2'>Not a Student? <Link to="/recruitlogin"><span className='link-color'>Login</span></Link>/<Link to="/recruitsignup"><span className='link-color'>Signup</span></Link> as a Recruiter</p>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SignupStudent
