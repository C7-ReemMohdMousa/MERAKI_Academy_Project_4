import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Explore.css";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Card, Button } from "react-bootstrap";
import Category from "./Category/Category";

const Explore = () => {
  //useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  //context
  const { courses, setCourses, filterdCourses, setFilterdCourses } =
    useContext(LearningContext);

  //states
  const [isFectched, setIsFectched] = useState(false);

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
        setIsFectched(true);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  const toCourseInfo = (e) => {
    navigate(`/coursedetail/${e.target.id}`);
  };

  console.log(filterdCourses.length);
  return (
    <div>
      <Category />
      {isFectched
        ? filterdCourses.length !== 0
          ? filterdCourses.map((element) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  key={element._id}
                  className="courses-cards"
                >
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.description}</Card.Text>
                    <Btn
                      value="View Course Details"
                      variant="primary"
                      id={element._id}
                      title={element.title}
                      onClick={toCourseInfo}
                    />
                  </Card.Body>
                </Card>
              );
            })
          : courses.map((element) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  key={element._id}
                  className="courses-cards"
                >
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.description}</Card.Text>
                    <Btn
                      value="View Course Details"
                      variant="primary"
                      id={element._id}
                      title={element.title}
                      onClick={toCourseInfo}
                    />
                  </Card.Body>
                </Card>
              );
            })
        : "No data"}
    </div>
  );
};

export default Explore;
