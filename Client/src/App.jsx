import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginStudent from './Components/StudentAuth/LoginStudent'
import Home from './Components/Home'
import ProfileCreation from './Components/ProfileCreation'
import SignupStudent from './Components/StudentAuth/SignupStudent'
import LoginRecruit from './Components/RecruiterAuth/LoginRecruit'
import SignupRecruit from './Components/RecruiterAuth/SignupRecruit'
function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/studlogin" element={<LoginStudent />} />
            <Route exact path="/studsignup" element={<SignupStudent />} />
            <Route exact path="/recruitlogin" element={<LoginRecruit />} />
            <Route exact path="/recruitsignup" element={<SignupRecruit />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profilecreate" element={<ProfileCreation />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
