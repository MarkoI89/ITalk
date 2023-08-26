import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Signup from './pages/Signup';
import Login from "./pages/Login.jsx"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  )
}

export default App
