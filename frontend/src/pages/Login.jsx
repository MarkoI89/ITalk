import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./auth.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/auth.context.jsx";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password};
    axios
      .post(`http://localhost:3002/auth/login`, requestBody)
      .then((response) => {
        navigate(`/user`);
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser(); 
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
          onSubmit={handleLoginSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={handleEmail}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={handlePassword}
          />
        <button style={{width: "70px"}} type="submit">Submit</button>
        </Box>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <button style={{ marginTop: "20px" }} onClick={() => navigate("/signup")}>
        create new account
      </button>
    </div>
  );
}

export default Login;
