import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import { Tab, Tabs, Card } from "react-bootstrap";

const StudentsDashboard = () => {
  //useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  //context
  const {
    courses,
    setCourses,
    userId,
    token,
    name,
    enrolledCourses,
    setEnrolledCourses,
    role,
    completedCourses,
    setCompletedCourses,
  } = useContext(LearningContext);

  //states
  const [userEnrolled, setUserEnrolled] = useState([]);
  const [isFectched, setIsFectched] = useState(false);

  //get the in progress courses
  useEffect(() => {
    axios
      .get(`http://localhost:5000/enroll/myinProgressCourses/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setUserEnrolled(response.data);
        setIsFectched(true);
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //get the in progress courses
  useEffect(() => {
    axios
      .get(`http://localhost:5000/enroll/myCompletedCourses/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setCompletedCourses(response.data);
        setIsFectched(true);
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //go to course dashboard
  const goToCourse = (courseId) => {
    navigate(`/coursedashboard/${courseId}`);
  };

  //cancel enrollment
  const cancelEnrollment = (courseId) => {
    console.log(courseId);
    axios
      .delete(`http://localhost:5000/enroll/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
        const newCoursesArr = userEnrolled.filter((element) => {
          return element.course._id !== courseId;
        });
        setUserEnrolled(newCoursesArr);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Welcome Back {name}!</h2>

      <div>
        <div className="tabs">
          <Tabs defaultActiveKey="profile" id="tabs" className="mb-3" justify>
            <Tab eventKey="home" title="In Progress Courses">
              <div>
                <div className="all-courses">
                  {isFectched
                    ? userEnrolled.map((element) => {
                        return (
                          <div
                            key={element.course._id}
                            className="all-courses-cards"
                          >
                            <Card>
                              <Card.Header>
                                {element.course.category.category}
                              </Card.Header>
                              <Card.Body>
                                <Card.Title>
                                  <div className="course-title">
                                    <h5>{element.course.title}</h5>
                                  </div>
                                </Card.Title>
                                <Card.Text>
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </Card.Text>
                                <div className="btns">
                                  <Btn
                                    value="go to course"
                                    id={element.course._id}
                                    onClick={() => {
                                      goToCourse(element.course._id);
                                    }}
                                  />
                                  <Btn
                                    value="cancel enrollment"
                                    variant="danger"
                                    id={element.course._id}
                                    onClick={() => {
                                      cancelEnrollment(element.course._id);
                                    }}
                                  />
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Completed Courses">
              <div className="all-courses">
                {isFectched
                  ? completedCourses.map((element) => {
                      return (
                        <div
                          key={element.course._id}
                          className="all-courses-cards"
                        >
                          <Card>
                            <Card.Header>
                              {element.course.category.category}
                            </Card.Header>
                            <Card.Body>
                              <Card.Title>
                                <div className="course-title">
                                  <h5>{element.course.title}</h5>
                                </div>
                              </Card.Title>
                              <Card.Text>
                                With supporting text below as a natural lead-in
                                to additional content.
                              </Card.Text>
                              <div className="btns">
                                <Btn
                                  value="go to course"
                                  id={element.course._id}
                                  onClick={() => {
                                    goToCourse(element.course._id);
                                  }}
                                />
                                <Btn
                                  value="generate a certificate"
                                  variant="success"
                                  id={element.course._id}
                                />
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* {isFectched ? (
        <div>
          <div className="dasboard-courses-container">
            <h4>in progress courses</h4>
            {console.log(userEnrolled)}
            {userEnrolled.map((element) => {
              return (
                <div key={element.course._id}>
                  <h6>{element.course.title}</h6>
                  <Btn
                    value="go to course"
                    id={element.course._id}
                    onClick={() => {
                      goToCourse(element.course._id);
                    }}
                  />
                  <Btn
                    value="cancel enrollment"
                    variant="danger"
                    id={element.course._id}
                    onClick={() => {
                      cancelEnrollment(element.course._id);
                    }}
                  />
                </div>
              );
            })}

            <h4>Completed Courses</h4>
            {console.log(userEnrolled)}
            {completedCourses.map((element) => {
              return (
                <div key={element.course._id}>
                  <h6>{element.course.title}</h6>
                  <Btn
                    value="go to course"
                    id={element.course._id}
                    onClick={() => {
                      goToCourse(element.course._id);
                    }}
                  />
                  <Btn
                    value="generate a certificate"
                    variant="success"
                    id={element.course._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default StudentsDashboard;
