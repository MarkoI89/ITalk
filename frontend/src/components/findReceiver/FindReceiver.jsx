import React from "react";
import "./findReceiver.css";
import { useState, useEffect } from "react";
import axios from "axios";
import OpenChat from "../openChat/OpenChat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SvgIcon } from "@mui/material";

function FindReceiver({
  setNewMessage,
  messages,
  setItrlId,
  setItrlFirstName,
  setItrlLastName,
  itrlFirstName,
  itrlLastName,
  itrlId,
  itrlAvatar,
  setItrlAvatar,
  chatModal,
  setChatModal,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [newChat, setNewChat] = useState(null);
  // const[messagesList, setMessagesList] = useState(messages)

  const selectReceiver = (receiver, index) => {
    setCurrentIndex(index);
    setReceiverId(receiver._id);
    setItrlId(receiver._id);
    setItrlFirstName(receiver.firstName);
    setItrlLastName(receiver.lastName);
    setItrlAvatar(receiver.avatar);
    setChatModal(true);
  };

  const findReceiver = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:3002/user?firstName=${firstName}&lastName=${lastName}`
      )
      .then((foundReceiver) => {
        setUsers(foundReceiver.data);
      });
  };
  console.log(users);

  return (
    <div className="findReceiver">
      <form className="findReceiverForm" onSubmit={findReceiver}>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          value={firstName}
          placeholder="First Name"
          className="receiverInput"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          value={lastName}
          placeholder="Last Name"
          className="receiverInput"
        />
        <button>find user</button>
      </form>
      {users && (
        <div className="usersList">
          {users.map((receiver, index) => {
            return (
              <div
                className="foundUsers"
                onClick={() => selectReceiver(receiver, index)}
                key={index}
              >
                <img
                  style={{
                    margin: "10px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  src={receiver.avatar}
                  alt="avatar"
                />
                <p>
                  {receiver.firstName} {receiver.lastName}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {chatModal && (
        <OpenChat
          itrlFirstName={itrlFirstName}
          itrlLastName={itrlLastName}
          messages={messages}
          itrlId={itrlId}
          setNewChat={setNewChat}
          setChatModal={setChatModal}
          itrlAvatar={itrlAvatar}
          setItrlAvatar={setItrlAvatar}
        />
      )}
      <div onClick={() => setNewMessage(null)}>
          <SvgIcon component={ArrowBackIcon}></SvgIcon>
        </div>
    </div>
  );
}

export default FindReceiver;
