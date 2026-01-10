import React from 'react'
import "../../css/login.css"

const LoginStudent = () => {
    const modeColor =()=>{
        
    }
    return (
        <div className="login-wrapper">
            <div >

                <svg
                    className="curve-bg"
                    viewBox="0 0 743 1014"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M679.165 1018.69C359.196 562.279 916 361.033 679.165 -6.60522C442.331 -374.243 0 -6.60522 0 -6.60522V1018.69C0 1018.69 999.135 1475.09 679.165 1018.69Z"
                        fill="#076726"
                    />
                </svg>

            </div>
            <div className='text-white position-relative z-2 greet'>
                <h2>Hello Friend !</h2>
                <p>Continue your journey</p><p> toward industry-ready </p ><p>skills</p>
            </div>


            <div className="login-content">
                {/* Login FORM */}
                <h2>Login</h2>
            </div>

        </div>
    )
}

export default LoginStudent
