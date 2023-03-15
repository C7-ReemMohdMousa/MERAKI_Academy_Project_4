import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import { Card, Button } from "react-bootstrap";
import Btn from "../Btn/Btn";

const Home = () => {
  //context
  const {
    courses,
    setCourses,
    filterdCourses,
    setFilterdCourses,
    isSearching,
    setIsSearching,
    searchingResults,
    setSearchingResults,
  } = useContext(LearningContext);

  setIsSearching(false);

  const navigate = useNavigate();

  const toCourseInfo = (e) => {
    navigate(`/coursedetail/${e.target.id}`);
  };

  return (
    <div>
      
    </div>
  );
};

export default Home;
