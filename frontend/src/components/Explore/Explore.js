import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Explore.css";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";

const Explore = () => {
  //useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  //context
  const { courses, setCourses } = useContext(LearningContext);

  //states

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCEBb1b_L6zDS3xTUrIALZOw&maxResults=25&key=AIzaSyCamNVFCRI8f7bUhG5ZSMUIYnbwYAuyHDY"
  //     )
  //     .then(function (response) {
  //       setCourses(response.data.items);
  //       console.log(Courses);
  //     })
  //     .catch(function (error) {
  //       console.log(error.response.data.message);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then(function (response) {
        setCourses(response.data.courses);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }, []);

  const toCourseInfo = (e) => {
    navigate(`/coursedetail/${e.target.id}`);
  };

  return (
    <div className="courses-cards">
      {courses.map((element) => {
        return (
          <div key={element._id}>
            <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src="" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">{element.description}</p>
                <Btn
                  value="View Course Details"
                  variant="primary"
                  id={element._id}
                  title={element.title}
                  onClick={toCourseInfo}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Explore;
