import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router";
import axios from "axios";
import "../currentUser/currentUser.css";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { SvgIcon } from "@mui/material";
import AllMessages from "../../components/allMessages/AllMessages.jsx";

function CurrentUser() {
  const [userToDisplay, setLoggedUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  // const { token } = useContext(AuthContext);
  const { user, logOutUser, isLoading, setIsLoading } = useContext(AuthContext);
  console.log(storedToken);

  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3002/user/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const user = res.data;
        setLoggedUser(user);
        setIsLoggedIn(true);
      });
  }, [storedToken, user._id]);

  return (
    <div className="home">
      {isLoading && <div>Loading...</div>}
      {isLoggedIn && (
        <div>
          <div className="userProfile">
            <div className="userDetails">
              <img
                style={{
                  margin: "10px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
                src={userToDisplay.avatar}
                alt=""
              />
              <p>
                {userToDisplay.firstName} {userToDisplay.lastName}
              </p>
            </div>
            <div className="currentUserOptions" >
              <div style={{ marginTop: "10px", marginRight: "25px"}}>
                <SvgIcon component={EditIcon} />
              </div>
              <div style={{ marginTop: "10px", marginRight: "25px" }}>
                <SvgIcon component={LogoutIcon} />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
      <div className="messages">{isLoggedIn && <AllMessages />}</div>
    </div>
  );
}

export default CurrentUser;
