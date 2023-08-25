import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./auth.css";
import { useState } from "react";

function Auth() {
  const [isRegistered, setIsRegistered] = useState(true);

//   const newAccount = "Create new account";
//   const logIn = "Log in";

  return (
    <div className="authContainer">
      <div>
        <h1>logo</h1>
      </div>
      <div className="formContainer">
        {!isRegistered && (
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
          >
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              required="true"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              required="true"
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" required="true" />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required="true"
            />
          </Box>
        )}
        {isRegistered && (
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
          >
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </Box>
        )}

        <button>Submit</button>
      </div>
      <button
        style={{ marginTop: "20px" }}
        onClick={() =>
          isRegistered ? setIsRegistered(null) : setIsRegistered(true)
        }
      >
        {isRegistered ? "Create new account" : "Log in"}
      </button>
    </div>
  );
}

export default Auth;
