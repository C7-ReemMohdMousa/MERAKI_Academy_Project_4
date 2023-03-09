import "./App.css";
import React, { createContext, useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { nav, Nav } from "react-bootstrap";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Explore from "./components/Explore/Explore";
import CourseInfo from "./components/CourseInfo/CourseInfo";

export const LearningContext = createContext();

function App() {
  //states
  const [isLogged, setIsLogged] = useState(false);
  const [token, settoken] = useState(
    JSON.parse(localStorage.getItem("userToken")) || ""
  );
  const [name, setName] = useState("");
  const [role, setRole] = useState("")

  return (
    <LearningContext.Provider
      value={{ token, settoken, setIsLogged, isLogged, name, setName, role, setRole}}
    >
      <div className="App">
        <header className="App-header">
          <h1></h1>
        </header>

        {token ? <DashboardNavigation /> : <Navigation />}

        {
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/coursedetail" element={<CourseInfo />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        }
      </div>
    </LearningContext.Provider>
  );
}

const Navigation = () => {
  return (
    <div>
      <Nav style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/"> Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/explore"> Explore</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register"> Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login"> Login</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

const DashboardNavigation = () => {
  const { setIsLogged, settoken } = useContext(LearningContext);

  const Logout = () => {
    localStorage.setItem("userToken", JSON.stringify(null));
    settoken(null);
    setIsLogged(false);
  };

  return (
    <div>
      <Nav style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/"> Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/explore"> Explore</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/dashboard"> Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login" onClick={Logout}>
            {" "}
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default App;
