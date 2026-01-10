import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginStudent from './Components/StudentAuth/LoginStudent'
import Home from './Components/Home'
import ProfileCreation from './Components/ProfileCreation'
function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/studlogin" element={<LoginStudent />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profilecreate" element={<ProfileCreation />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
