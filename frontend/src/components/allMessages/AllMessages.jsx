import "./allMessages.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import axios from "axios";
import avatar from "../../assets/blank-profile-picture-973460_640.png";
import SendMessage from "../sendMessage/SendMessage";
// import useDetectKeyboardOpen from "use-detect-keyboard-open"

function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [itrlFirstName, setItrlFirstName] = useState(null); // itrl => interlocutor
  const [itrlLastName, setItrlLastName] = useState(null);
  const [itrlId, setItrlId] = useState(null);
  const [itrlAvatar, setItrlAvatar] = useState(null);
  const [chatModal, setChatModal] = useState(null);
  const { user } = useContext(AuthContext);

  // const isKeyboardOpen = useDetectKeyboardOpen()

  console.log(user._id);
  const storedToken = localStorage.getItem("authToken");

  const openChat = (message, index) => {
    setCurrentIndex(index);
    setItrlId(message.id);
    setItrlFirstName(message.firstName);
    setItrlLastName(message.lastName);
    setItrlAvatar(message.avatar);
    setChatModal(true);
  };

  const closeChat = (message, index) => {
    setChatModal(null);
    setCurrentIndex(null);
    setItrlId(null);
    setItrlFirstName(null);
    setItrlLastName(null);
    setItrlAvatar(null);
  };

  console.log(itrlFirstName);

  const interlocutorChat = messages.map((message, index) => {
    if (
      message.author._id === user._id &&
      (message.receiver._id === itrlId || message.author._id === itrlId) &&
      message.receiver._id === user._id
    ) {
      return message.text;
    }
  });

  console.log(interlocutorChat);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/${user._id}/messages`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        // const msg = res.data;
        setMessages(res.data);
        // console.log(msg);
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

  console.log(user._id);
  console.log(itrlId);

  return (
    <>
      {filteredMessages.map((message, index) => (
        <div
          onClick={() => openChat(message, index)}
          className="chat"
          key={index}
        >
          <div className="profilePicture">
            <img src={avatar} alt="avatar" />
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
        <div className="chatModal">
          <div className="interlocutor">
            <button onClick={() => closeChat()}>x</button>
            <img
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                margin: "10px",
              }}
              src={avatar}
              alt=""
            />
            <p style={{ margin: "10px" }}>
              {itrlFirstName} {itrlLastName}
            </p>
          </div>
          <div>
            {messages.map((message, index) => {
              if (
                (message.author._id === user._id &&
                  message.receiver._id === itrlId) ||
                (message.author._id === itrlId &&
                  message.receiver._id === user._id)
              ) {
                return (
                  <div
                    key={index}
                    className={
                      message.author._id === user._id
                        ? "userAuthorMsg"
                        : "interlocutorAuthorMsg"
                    }
                  >
                    <div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <SendMessage receiver={itrlId} />
        </div>
      )}
    </>
  );
}

export default AllMessages;
