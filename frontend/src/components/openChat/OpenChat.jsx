import "./openChat.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import SendMessage from "../sendMessage/SendMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SvgIcon } from "@mui/material";

function OpenChat({
  messages,
  setCurrentIndex,
  setItrlId,
  setItrlFirstName,
  setItrlLastName,
  setItrlAvatar,
  itrlFirstName,
  itrlLastName,
  itrlId,
  itrlAvatar,
  setChatModal,
  receiverId,
  setNewChat,
  setNewMessage,
}) {
  const { user } = useContext(AuthContext);

  const closeChat = () => {
    setChatModal(null);
  };

  console.log(itrlFirstName);
  console.log(itrlAvatar);

  return (
    <div className="chatModal">
      <div className="interlocutor">
        <div onClick={closeChat}>
          <SvgIcon component={ArrowBackIcon}></SvgIcon>
        </div>
        <img
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            margin: "10px",
            objectFit: "cover",
          }}
          src={itrlAvatar}
          alt="avatar"
        />
        <p style={{ margin: "10px" }}>
          {itrlFirstName} {itrlLastName}
        </p>
      </div>
      <div className="wholeChat">
        {messages.map((message, index) => {
          if (
            (message.author._id === user._id &&
              message.receiver._id === itrlId) ||
            (message.author._id === itrlId && message.receiver._id === user._id)
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
      <div>
        <SendMessage receiver={itrlId} />
      </div>
    </div>
  );
}

export default OpenChat;
