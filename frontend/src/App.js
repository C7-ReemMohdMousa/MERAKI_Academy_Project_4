import "./App.css";
import React, { createContext, useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

export const LearningContext = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(""); //local storage

  return (
    <LearningContext.Provider>
      <div className="App">
        <header className="App-header">
          <h1>Project 4 </h1>
        </header>
        <Login />
        <Register />

        {
          <Routes>
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        }
      </div>
    </LearningContext.Provider>
  );
}

export default App;
