import "./homE.css";
import AddItem from './AddItem';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function App() {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setNoteList(response.data);
    });
  }, []);

  const deleteAll = () => {
    Axios.delete("http://localhost:3001/api/delete");
  };

  const deleteNoteById = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  return (
    <Router>
      <div>
        <Link to="/add-item">
          <button className="addButton">ADD</button>
        </Link>
        <button className="deleteAllButton" onClick={deleteAll}>
          DELETE ALL
        </button>
        <div className="App">
          {noteList.map((val) => {
            return (
              <div className="card">
                <div className="info">
                  <p className="title">{val.title}</p>
                  <p className="titleDescription">{val.title_description}</p>
                </div>

                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      deleteNoteById(val.id);
                    }}
                  >
                    delete
                  </button>
                  <button className="btn">update</button>
                  <button className="btn">details</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Routes>
        <Route path="/add-item" component={AddItem} />
      </Routes>
    </Router>
  );
}

export default App;
