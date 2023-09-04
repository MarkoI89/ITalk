import React from "react";
import "./sendMessage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import SendIcon from "@mui/icons-material/Send";
import { SvgIcon } from "@mui/material";

function SendMessage(props) {
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");
  console.log(user.firstName, props.receiver);

  const sendMessage = (e) => {
    e.preventDefault();
    const body = { author: user._id, receiver: props.receiver, text: message };

    axios
      .post("http://localhost:3002/message-create", body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setMessage("");
      });
  };
  console.log(message);

  useEffect(() => {}, []);

  return (
    <form onSubmit={sendMessage} className="messageInput">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
      />
    <SvgIcon onClick={sendMessage} style={{marginRight: "10px"}} component={SendIcon} />
    </form>
  );
}

export default SendMessage;
