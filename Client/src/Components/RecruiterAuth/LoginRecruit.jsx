import React, { useState } from 'react'
import "../../css/auth.css"
import ThemeToggle from '../ThemeToggle'
import eye_open from "../../assets/eye_open.png"
import eye_closed from "../../assets/eye_closed.png"
import { Link, useNavigate } from "react-router-dom"
const BASE_URL = "http://localhost:5000"

const LoginRecruit = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/api/recruitauth/recruitLogin`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        })

        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authToken)
            props.showAlert("Logged-in Successfully", "success")
            navigate("/recruitDashboard")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
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
                <h2>Hello Recruiter !</h2>
                <p>Access talent insights</p><p> and role-ready </p ><p>candidates</p>
            </div>


            <div className="login-content form-text-color">
                {/* Login FORM */}
                <div className='flex flex-column'>
                    <h2>Login</h2>
                    <p>as a Recruiter</p>
                    <p className='fs-6'>Don't have an Account? <Link to="/recruitsignup"><span className='link-color'>Signup</span></Link></p>
                </div>
                <div>
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="recruit-email" className="form-label">Email address</label>
                            <input type="email" className="form-control input" id="recruit-email" aria-describedby="email" placeholder="john@example.com" value={credentials.email} name='email' onChange={onChange} />

                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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

                        <div className='flex flex-column'>

                            <div className='my-2 forgot'>Forgot your password ? </div>
                            <button className='btn link-color-btn text-white my-1'>Login</button>
                            <p className='fs-6 my-2'>Not a Recruiter? <Link to="/studlogin"><span className='link-color'>Login</span></Link>/<Link to="/studsignup"><span className='link-color'>Signup</span></Link> as a Student</p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LoginRecruit





// LoginRecruit