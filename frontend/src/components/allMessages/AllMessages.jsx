import "./allMessages.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import axios from "axios";
import avatar from "../../assets/blank-profile-picture-973460_640.png";

function AllMessages() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(user._id);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`http://localhost:3002/${user._id}/messages`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const msg = res.data;
        setMessages(msg);
        console.log(msg);
      });
  }, []);
  console.log(messages);

  let allUserMessages = messages
    .map((message) =>
      message.receiver._id === user._id //condition removes the name of logged user and shows the name of other user from chat
        ? {
            id: message.author._id,
            firstName: message.author.firstName,
            lastName: message.author.lastName,
            text: message.text,
          }
        : {
            id: message.receiver._id,
            firstName: message.receiver.firstName,
            lastName: message.receiver.lastName,
            text: message.text,
          }
    )
    .reverse();

  let filteredMessages = allUserMessages.filter(
    (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i // remove double elements in array of objects(remove all the message from the same person and leave just latest)
  );

  console.log(filteredMessages);

  return (
    <>
      {filteredMessages.map((message, index) => (
        <div className="chat" key={index}>
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
    </>
  );
}

export default AllMessages;
