import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./auth.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/auth.context.jsx";

function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { firstName, lastName, email, password };

    axios
      .post(`http://localhost:3002/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="authContainer">
      <div>
        <h1>logo</h1>
      </div>
      <div className="formContainer">
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              paddingBottom: "10px",
              width: "90%",
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSignupSubmit}
        >
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            required="true"
            onChange={handleFirstName}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            required="true"
            onChange={handleLastName}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required="true"
            onChange={handleEmail}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required="true"
            onChange={handlePassword}
          />
          <button style={{ width: "70px" }} type="submit">
            Submit
          </button>
        </Box>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <div className="loginButton">
        <p>Already have an account?</p>
        <button
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
