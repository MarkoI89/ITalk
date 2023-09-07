import "./allMessages.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import axios from "axios";
import OpenChat from "../openChat/OpenChat";
import FindReceiver from "../findReceiver/FindReceiver";
import MessageIcon from "@mui/icons-material/Message";
import { SvgIcon } from "@mui/material";

function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [itrlFirstName, setItrlFirstName] = useState(null); // itrl => interlocutor
  const [itrlLastName, setItrlLastName] = useState(null);
  const [itrlId, setItrlId] = useState(null);
  const [itrlAvatar, setItrlAvatar] = useState(null);
  const [chatModal, setChatModal] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const openChat = (message, index) => {
    setCurrentIndex(index);
    setItrlId(message.id);
    setItrlFirstName(message.firstName);
    setItrlLastName(message.lastName);
    setItrlAvatar(message.avatar);
    setChatModal(true);
  };

  console.log(itrlFirstName)

  useEffect(() => {
    axios
      .get(`http://localhost:3002/${user._id}/messages`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setMessages(res.data);
      });
  }, [user._id, storedToken]);
  console.log(messages);

  let allUserMessages = messages
    .map((message) =>
      message.receiver._id === user._id //condition removes the name of logged user and shows the name of other user from chat
        ? {
            id: message.author._id,
            avatar: message.author.avatar,
            firstName: message.author.firstName,
            lastName: message.author.lastName,
            text: message.text,
          }
        : {
            id: message.receiver._id,
            avatar: message.receiver.avatar,
            firstName: message.receiver.firstName,
            lastName: message.receiver.lastName,
            text: message.text,
          }
    )
    .reverse();

  console.log(allUserMessages);

  let filteredMessages = allUserMessages.filter(
    (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i // remove double elements in array of objects(remove all the message from the same person and leave just latest)
  );

  return (
    <>
      {messages.length < 1 && <p>No messages here</p>}
      {filteredMessages.map((message, index) => (
        <div
          onClick={() => openChat(message, index)}
          className="chat"
          key={index}
        >
          <div className="profilePicture">
            <img src={message.avatar} alt="avatar" />
          </div>
          <div className="chatDetails">
            <div className="usersChatName">
              <p>{message.firstName}</p>
              <p>{message.lastName}</p>
            </div>
            <p style={{ margin: "0px 2px 0px 0px", color: "gray" }}>
              {message.text}
            </p>
          </div>
        </div>
      ))}
      {chatModal && (
        <OpenChat
          messages={messages}
          setCurrentIndex={setCurrentIndex}
          setItrlId={setItrlId}
          setItrlFirstName={setItrlFirstName}
          setItrlLastName={setItrlLastName}
          setItrlAvatar={setItrlAvatar}
          itrlFirstName={itrlFirstName}
          itrlLastName={itrlLastName}
          itrlId={itrlId}
          chatModal={chatModal}
          setChatModal={setChatModal}
          itrlAvatar={itrlAvatar}
        />
      )}
      <div className="newMessageIcon" onClick={() => setNewMessage(true)}>
              <SvgIcon style={{margin:"16px" }} component={MessageIcon} />
            </div>
      {newMessage && (
        <FindReceiver
          setNewMessage={setNewMessage}
          chatModal={chatModal}
          setChatModal={setChatModal}
          messages={messages}
          setItrlId={setItrlId}
          setItrlFirstName={setItrlFirstName}
          setItrlLastName={setItrlLastName}
          setItrlAvatar={setItrlAvatar}
          itrlAvatar={itrlAvatar}
          itrlFirstName={itrlFirstName}
          itrlLastName={itrlLastName}
          itrlId={itrlId}
        />
      )}
    </>
  );
}

export default AllMessages;
