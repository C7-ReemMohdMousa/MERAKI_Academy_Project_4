import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import { Card, Button } from "react-bootstrap";
import Btn from "../Btn/Btn";
import "./Home.css";

//images
import Unis from "../images/Unis.jpg";
import hermone from "../images/hermone.jpg";

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
        <div className="hero-img-div">
          <img
            className="hero-img"
            src="https://store.hp.com/app/assets/images/uploads/prod/best-hp-laptops-for-students-31546648312210.jpg?impolicy=prdimg&imdensity=1&imwidth=600"
          />
        </div>
      </div>

      <div className="unis-imgs">
        <img src={Unis} className="unis-imgs" />
      </div>

      <div>
        <div className="our-story">
        
          <div className="our-story-content">
            <div>
              <div>
                <div>
                  <h1>Our Story</h1>
                </div>
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit distinctio mollitia nisi illo officiis incidunt
                laudantium dicta tempora! Neque totam fuga aperiam ab dolores
                eaque suscipit rerum voluptatem architecto! Eveniet.

                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit distinctio mollitia nisi illo officiis incidunt
                laudantium dicta tempora! Neque totam fuga aperiam ab dolores
                eaque suscipit rerum voluptatem architecto! Eveniet.
              </p>
            </div>
            <div id="achivment">
              <img
                // src="https://images.ctfassets.net/00atxywtfxvd/4vOWgNjy4KExR8msqHnJEP/bb1557d60e8a29f6a5f09148f700bff5/partner-logos.png"
                src="https://business.edx.org/hubfs/B2B-partner-logos-V6.png"
                className="all-unis"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="meet-our-students">
        <h1>Meet Our Students</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
          distinctio mollitia nisi illo officiis incidunt laudantium dicta
          tempora! Neque totam fuga aperiam ab dolores eaque suscipit rerum
          voluptatem architecto! Eveniet.
        </p>
        {/* <p>Lorem ipsum, dolor sit amet consectetur:</p> */}

        <div className="about-cards">
          <div className="student-card">
            <div className="bio-heading">
              <h3>Hermione Granger, UK</h3>
              <img className="bio-img" src={hermone} />
              <h5>Software Developer</h5>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
              distinctio mollitia nisi illo officiis incidunt laudantium dicta
              tempora! Neque totam fuga aperiam ab dolores eaque suscipit rerum
              voluptatem architecto! Eveniet.
            </p>
          </div>
          <div className="student-card">
            <div className="bio-heading">
              <h3>Hermione Granger</h3>
              <img className="bio-img" src={hermone} />
              <h5>Software Developer</h5>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
              distinctio mollitia nisi illo officiis incidunt laudantium dicta
              tempora! Neque totam fuga aperiam ab dolores eaque suscipit rerum
              voluptatem architecto! Eveniet.
            </p>
          </div>
          <div className="student-card">
            <div className="bio-heading">
              <h3>Hermione Granger</h3>
              <img className="bio-img" src={hermone} />
              <h5>Software Developer</h5>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
              distinctio mollitia nisi illo officiis incidunt laudantium dicta
              tempora! Neque totam fuga aperiam ab dolores eaque suscipit rerum
              voluptatem architecto! Eveniet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
