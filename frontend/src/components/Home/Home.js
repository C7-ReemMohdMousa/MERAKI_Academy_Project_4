import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import { Card, Button } from "react-bootstrap";
import Btn from "../Btn/Btn";
import "./Home.css";
import Unis from "../images/Unis.jpg";

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

  const goToRegister = () => {
    navigate(`/register`);
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>Learn Without Limits</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            distinctio mollitia nisi illo officiis incidunt laudantium dicta
            tempora! Neque totam fuga aperiam ab dolores eaque suscipit rerum
            voluptatem architecto! Eveniet.
          </p>
          <div className="join-now-btn">
            <Btn value="Join Now for Free!" onClick={goToRegister} />
          </div>
        </div>
      </div>

      <div className="unis-imgs">
        <img src={Unis} className="unis-imgs"/>
      </div>



    </div>
  );
};

export default Home;
