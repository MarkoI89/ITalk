import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import CurrentUser from "./pages/currentUser/CurrentUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CurrentUser />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
