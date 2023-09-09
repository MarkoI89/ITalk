import React from "react";
import "./editProfile.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SvgIcon } from "@mui/material";

function EditProfile() {
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { user, authenticateUser } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const changeFirstName = (e) => setFirstName(e.target.value);
  const changeLastName = (e) => setLastName(e.target.value);

  console.log(user._id);

  const submitChanges = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("avatar", avatar);
    if (firstName === "") {
      setFirstName(user.firstName)
      fd.append("firstName", firstName);
    } else {
      fd.append("firstName", firstName);
    }
    if (lastName === "") {
      setLastName(user.lastName);
      fd.append("lastName", lastName);
    } else {
      fd.append("lastName", lastName);
    }

    const config = {
      url: `http://localhost:3002/user/${user._id}/edit`,
      method: "PATCH",
      headers: { Authorization: "Bearer " + storedToken },
      data: fd,
    };
    axios(config)
      .then((res) => {
        authenticateUser();
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {}, []);

  return (
    <>
    <div onClick={() => navigate("/")} className="arrowBack" >
    <SvgIcon component={ArrowBackIcon}></SvgIcon>
    </div>
    <form onSubmit={submitChanges} className="editProfile">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="profileImage">
          <img src={user.avatar} alt="" />
        </div>
        <div>
          <p>Change profile photo:</p>
          <input
            onChange={(e) => setAvatar(e.target.files[0])}
            className="browsePhoto"
            type="file"
            name=""
            id=""
          />
        </div>
      </div>
      <div style={{ margin: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <p style={{ marginRight: "10px" }}>First Name:</p>
          <input
            onChange={changeFirstName}
            className="profileInput"
            type="text"
            placeholder={user.firstName}
            value={firstName}
            id=""
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <p style={{ marginRight: "10px" }}>Last Name:</p>
          <input
            onChange={changeLastName}
            className="profileInput"
            type="text"
            placeholder={user.lastName}
            value={lastName}
            id=""
          />
        </div>
      </div>
      <button className="submitChanges">Save changes</button>
    </form>
    </>
  );
}

export default EditProfile;
