import "./home.css";
import AddItem from "./AddItem";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const instance = Axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

function App() {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    instance.get("api/get").then((response) => {
      setNoteList(response.data);
    });
  }, []);

  const [selectedIds, setSelectedIds] = useState([]); // Sample selected IDs

  const handleDelete = async () => {
    console.log(noteList);

    let result = await instance.delete('deleteData', { data: { ids: selectedIds }})

    if(result.status === 200){
      setNoteList(noteList.filter((n) => !selectedIds.includes(n.id)));
      setSelectedIds([]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
      <div>
        <Link to="/add-item">
          <button className="addButton">ADD</button>
        </Link>
        <button
          className="deleteAllButton"
          onClick={async ()=>await handleDelete()}
        >
          MASS DELETE
        </button>
        <div className="App">
          {noteList.map((val) => {
            return (
              <div className="card">
                <Checkbox sx={{marginRight: 23}}
                  onClick={() => {}}
                  onChange={({ target }) => {
                    if (target.checked) {
                      setSelectedIds([...selectedIds, val.id]);
                      return;
                    }
                      setSelectedIds(selectedIds.filter(i => i !== val.id))                    
                  }}
                  checked={selectedIds.includes(val.id)}
                />
                <div className="info">
                  <p className="title">{val.title}</p>
                  <p className="titleDescription">{val.title_description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Router>
  );
}

export default App;
