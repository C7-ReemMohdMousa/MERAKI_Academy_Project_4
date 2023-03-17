import "./App.css";
import React, { createContext, useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Explore from "./components/Explore/Explore";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CourseDashboard from "./components/CourseDashboard/CourseDashboard";

import axios from "axios";
import Search from "antd/es/transfer/search";
import DashboardNavigation from "./components/NavBar/DashboardNavigation";
import { nav, Nav } from "react-bootstrap";
import Navigation from "./components/NavBar/Navigation";
import Footer from "./components/Footer/Footer";

import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./components/MyDocument";

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
  const [createdCourses, setCreatedCourses] = useState([]);
  const [filterdCourses, setFilterdCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [enrollmentInfo, setEnrollmentInfo] = useState("");
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchingResults, setSearchingResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);



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
        createdCourses,
        setCreatedCourses,
        filterdCourses,
        setFilterdCourses,
        course,
        setCourse,
        lectures,
        setLectures,
        enrollmentInfo,
        setEnrollmentInfo,
        completedCourses,
        setCompletedCourses,
        isSearching,
        setIsSearching,
        searchingResults,
        setSearchingResults,
        categories,
        setCategories,
        isFiltering,
        setIsFiltering,
      }}
    >
      <div className="App">
        {token ? <DashboardNavigation /> : <Navigation />}
        {
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/coursedetail/:id" element={<CourseInfo />} />
            <Route path="/coursedashboard/:id" element={<CourseDashboard />} />

            <Route path="/register" element={<Register />} />

            <Route path="/search" element={<Search />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        }

      

        {/* <PDFDownloadLink document={<MyDocument />} filename="FORM">
          {({  blob, url, loading, error  }) =>
            loading ? (
              <button>Loading Document...</button>
            ) : (
              <button>Download</button>
            )
          }
        </PDFDownloadLink> */}

 
        <Footer />
      </div>
    </LearningContext.Provider>
  );
}

export default App;
