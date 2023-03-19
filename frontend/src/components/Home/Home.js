import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import { Card, Button } from "react-bootstrap";
import Btn from "../Btn/Btn";
import "./Home.css";

//images
import Unis from "../images/Unis.png";
import hermone from "../images/hermone.jpg";
import ourStory from "../images/our-story.png";
import logo from "../images/logo.png";
import students from "../images/students.jpeg";
import personal from "../images/1.jfif";
import personal2 from "../images/2.jpeg";
import personal3 from "../images/3.jfif";

const Home = () => {
  //context
  const { setIsSearching, token } = useContext(LearningContext);

  setIsSearching(false);

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate(`/register`);
  };

  const goToExplore = () => {
    navigate(`/explore`);
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1 style={{ color: "#0d6efd", fontSize: "bold" }}>
            Learn Without Limits
          </h1>
          <p>
            Curious Learner is a nonprofit organization that provides a massive
            open online course (MOOC) platform, dedicated to helping students
            from all over the world to get the knowledge they aspire to, from
            the most prestigious and high-rated universities for free, such as
            MIT, Harvard, ..., etc.
          </p>
          {token ? (
            <div className="join-now-btn">
              <Btn value="Explore The Courses" onClick={goToExplore} />
            </div>
          ) : (
            <div className="join-now-btn">
              <Btn value="Join Now for Free!" onClick={goToRegister} />
            </div>
          )}
        </div>
        <div className="hero-img-div">
          <img
            className="hero-img"
            src="https://store.hp.com/app/assets/images/uploads/prod/best-hp-laptops-for-students-31546648312210.jpg?impolicy=prdimg&imdensity=1&imwidth=600"
          />
        </div>
      </div>

      <div className="unis-imgs">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>Our partners and collaborators</h4>
        </div>
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
                eaque suscipit rerum voluptatem architecto! Eveniet. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
                distinctio mollitia nisi illo officiis incidunt laudantium dicta
                tempora! Neque totam fuga aperiam ab dolores eaque suscipit
                rerum voluptatem architecto! Eveniet.
              </p>
            </div>
            <div id="achivment">
              <img
                // src="https://images.ctfassets.net/00atxywtfxvd/4vOWgNjy4KExR8msqHnJEP/bb1557d60e8a29f6a5f09148f700bff5/partner-logos.png"
                // src="https://business.edx.org/hubfs/B2B-partner-logos-V6.png"
                // src="https://images.ctfassets.net/00atxywtfxvd/3JTfOpbc60Z57eLxWRtCZe/f6da896e4f7c4a5b6fa7fd8d33d89586/Coursera_Our_Story_Assets.jpeg"
                src={students}
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
              <h3>Emily Brown</h3>
              <img className="bio-img" src={personal2} />
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
              <h3>Carla Smith</h3>
              <img className="bio-img" src={personal3} />
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
              <h3>Jane Dou</h3>
              <img className="bio-img" src={personal} />
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
