import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginStudent from './Components/StudentAuth/LoginStudent'
import LandingPage from './Components/LandingPage'
import ProfileCreation from './Components/ProfileCreation'
import SignupStudent from './Components/StudentAuth/SignupStudent'
import LoginRecruit from './Components/RecruiterAuth/LoginRecruit'
import SignupRecruit from './Components/RecruiterAuth/SignupRecruit'
import Dashboard from './Components/Dashboard'
import { useState } from 'react'
import Alert from "./Components/Alert"
import RecruitDashboard from './Components/RecruitDashboard'

import DashboardHome from "./pages/DashboardHome"
import Analysis from "./pages/Analysis"
import Profile from "./pages/Profile"
import Roadmap from "./pages/Roadmap"

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);

  }

  return (
    <>
      <div>
        <Router>
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/studlogin" element={<LoginStudent showAlert={showAlert} />} />
            <Route exact path="/studsignup" element={<SignupStudent showAlert={showAlert} />} />
            <Route exact path="/recruitlogin" element={<LoginRecruit showAlert={showAlert} />} />
            <Route exact path="/recruitsignup" element={<SignupRecruit showAlert={showAlert} />} />
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/profilecreate" element={<ProfileCreation showAlert={showAlert} />} />
            <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert} />} >
              <Route index element={<DashboardHome />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route exact path="/recruitDashboard" element={<RecruitDashboard showAlert={showAlert} />} />
           
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
