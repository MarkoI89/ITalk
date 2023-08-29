import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router";
import axios from "axios";

function CurrentUser(props) {
  const [userToDisplay, setLoggedUser] = useState({});

  // const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const getUser = () => {
    axios.get(`http://localhost:3002/user/64dced82ae7eff0c0e24c783`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      const user = res.data
      console.log(user)
      setLoggedUser(user)
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return(
 <h1>zdravo{userToDisplay.firstName}</h1>
 )
}

export default CurrentUser;
