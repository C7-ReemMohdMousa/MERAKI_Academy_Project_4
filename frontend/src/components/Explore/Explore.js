import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Explore.css";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Card, Button } from "react-bootstrap";
import Category from "./Category/Category";
import Search from "antd/es/transfer/search";

const Explore = () => {
  //useNavigate hook to navigate programmatically
  const navigate = useNavigate();

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
    isFiltering,
    setIsFiltering,
  } = useContext(LearningContext);

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
      .get("https://curious-learner.onrender.com/courses")
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

  return (
    <div className="explore-all-page">
      <div className="courses-header">
        <h2>All Courses</h2>
      </div>
      <div className="explore-page">
        <div className="filter">
          <Category />
        </div>
        <div className="explore-courses">
          {isFectched ? (
            filterdCourses.length !== 0 ? (
              filterdCourses.map((element) => {
                return (
                  <Card
                    style={{ width: "18rem" }}
                    key={element._id}
                    className="courses-cards"
                  >
                    <Card.Img variant="top" src={element.image} />
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.thumbnail}</Card.Text>
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
            ) : searchingResults.length !== 0 ? (
              <SearchResultsCom />
            ) : isSearching === false && isFiltering == false ? (
              courses.map((element) => {
                return (
                  <div className="explore-courses">
                    <Card
                      className="courses-cards"
                      style={{ width: "18rem" }}
                      key={element._id}
                    >
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={element.image}
                      />
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Text>{element.thumbnail}</Card.Text>
                        <Btn
                          value="View Course Details"
                          variant="primary"
                          id={element._id}
                          title={element.title}
                          onClick={toCourseInfo}
                        />
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              "no courses found"
            )
          ) : (
            "no data"
          )}
        </div>
      </div>
    </div>
  );
};

const SearchResultsCom = () => {
  const navigate = useNavigate();

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

  const toCourseInfo = (e) => {
    navigate(`/coursedetail/${e.target.id}`);
  };

  return (
    <div className="explore-all-page">
      <div className="explore-page">
        {searchingResults.length !== 0
          ? searchingResults.map((element) => {
              return (
                <div className="explore-courses">
                  <Card
                    style={{ width: "18rem" }}
                    key={element._id}
                    className="courses-cards"
                  >
                    <Card.Img variant="top" src={element.image} />
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.thumbnail}</Card.Text>
                      <Btn
                        value="View Course Details"
                        variant="primary"
                        id={element._id}
                        title={element.title}
                        onClick={toCourseInfo}
                      />
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Explore;
