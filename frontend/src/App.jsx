import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import CurrentUser from "./pages/currentUser/CurrentUser";
import NewMessage from "./pages/newMessage/NewMessage";
import FindReceiver from "./components/findReceiver/FindReceiver";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CurrentUser />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/search" element={<FindReceiver />} /> */}
        <Route path="/new-message" element={<NewMessage />} />
      </Routes>
    </div>
  );
}

export default App;
