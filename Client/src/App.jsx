import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginStudent from './Components/StudentAuth/LoginStudent'
import Home from './Components/Home'
import ProfileCreation from './Components/ProfileCreation'
import SignupStudent from './Components/StudentAuth/SignupStudent'
import LoginRecruit from './Components/RecruiterAuth/LoginRecruit'
import SignupRecruit from './Components/RecruiterAuth/SignupRecruit'
import Dashboard from './Components/Dashboard'
import Alert from './components/Alert';
import { useState } from 'react'

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
          <Routes>
            <Route exact path="/studlogin" element={<LoginStudent showAlert={showAlert}/>} />
            <Route exact path="/studsignup" element={<SignupStudent showAlert={showAlert}/>} />
            <Route exact path="/recruitlogin" element={<LoginRecruit showAlert={showAlert}/>} />
            <Route exact path="/recruitsignup" element={<SignupRecruit showAlert={showAlert}/>} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profilecreate" element={<ProfileCreation showAlert={showAlert}/>} />
            <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert}/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
