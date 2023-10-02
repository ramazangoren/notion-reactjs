import "./AddItem.css";
import React, { useState } from "react";
import Axios from "axios";

function AddItem() {
  const [title, setTitle] = useState("");
  const [titleDescription, setTitleDescription] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const titleDescriptionHandler = (e) => {
    setTitleDescription(e.target.value);
  };

  const saveNotes = () => {
    Axios.post("http://localhost:3001/api/add", {
      title: title,
      titleDescription: titleDescription,
    });
  };

  return (
    <div className="AddItem">
      <button className="saveButton" onClick={saveNotes}>
        save
      </button>
      <button className="cancelButton">cancel</button>
      <div className="input">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          onChange={titleHandler}
        />{" "}
        <br />
        <input
          type="text"
          name="titleDescription"
          id="titleDescription"
          placeholder="title description"
          onChange={titleDescriptionHandler}
        />
      </div>
    </div>
  );
}

export default AddItem;
