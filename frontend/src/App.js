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
import CourseDashboard from "./components/CourseDashboard/CourseDashboard";

export const LearningContext = createContext();

function App() {
  //states
  const [isLogged, setIsLogged] = useState(false);
  const [token, settoken] = useState(
    JSON.parse(localStorage.getItem("userToken")) || ""
  );
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("userName")) || ""
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || ""
  );

  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("userRole")) || ""
  );

  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <LearningContext.Provider
      value={{
        token,
        settoken,
        setIsLogged,
        isLogged,
        name,
        setName,
        role,
        setRole,
        courses,
        setCourses,
        setUserId,
        userId,
        enrolledCourses,
        setEnrolledCourses,
      }}
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
            <Route path="/coursedetail/:id" element={<CourseInfo />} />
            <Route path="/coursedashboard/:id" element={<CourseDashboard />} />

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
  const { setIsLogged, settoken, setName, setUserId } =
    useContext(LearningContext);

  const Logout = () => {
    localStorage.setItem("userToken", JSON.stringify(null));
    settoken(null);
    setIsLogged(false);
    setName("");
    setUserId("");
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
