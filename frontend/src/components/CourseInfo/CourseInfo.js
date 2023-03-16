import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";
import "./CourseInfo.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Tab, Tabs } from "react-bootstrap";

const CourseInfo = () => {
  const params = useParams();
  const id = params.id;

  //states
  const [isEnrolled, setIsEnrolled] = useState(false);
  //useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  //context
  const {
    courses,
    setCourses,
    userId,
    token,
    enrolledCourses,
    setEnrolledCourses,
    role,
  } = useContext(LearningContext);

  //state
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [course, setCourse] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [key, setKey] = useState("About");

  //If Admin; dectivate enroll button and activate go to course btn
  useEffect(() => {
    if (role == "admin") {
      setIsAdmin(true);
    }
  }, []);

  //get the course
  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses//${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setCourse([response.data]);
        setIsFetched(true);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const enrollTheCourse = () => {
    axios
      .post(
        `http://localhost:5000/enroll/enrollCourse/${id}`,
        { course: id, user: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setEnrolledCourses(response.data);
        setIsEnrolled(true);
      })
      .catch(function (error) {
        throw error;
      });
  };

  //CHECK IF THE USER IS ALREADY ENROLLED THE COURSE
  useEffect(() => {
    axios
      .get(`http://localhost:5000/enroll/${id}/${userId}`)
      .then((response) => {
        if (response.data.success) {
          setIsEnrolled(true);
          console.log(isEnrolled);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const goToCourse = (e) => {
    //go to course dashboard
    navigate(`/coursedashboard/${e.target.id}`);
    console.log(e.target.id);
  };

  //CHECK IF THE USER IS THE INSTRUCTOR OF THE COURSE
  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/isinstructor/${id}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setIsInstructor(true);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  console.log(course);

  return (
    <div className="course-info">
      {isFetched
        ? course.map((element) => {
            console.log(element._id);
            return (
              <div key={element._id} className="course-detalis">
                <div className="course-detalis-first-div">
                  {" "}
                  <div className="course-detalis-thumbnail">
                    <h1>{element.title}</h1>
                    <h5>{element.category.category}</h5>
                    <Rating name="read-only" value={4} readOnly />
                    <p>
                      {element.description}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Suscipit distinctio mollitia nisi illo officiis incidunt
                      laudantium dicta tempora! Neque totam fuga aperiam ab
                      dolores eaque suscipit rerum voluptatem architecto!
                      Eveniet.
                    </p>
                    {isEnrolled || isInstructor || isAdmin ? (
                      <Btn
                        value="go to course"
                        variant="success"
                        id={element._id}
                        onClick={goToCourse}
                      />
                    ) : (
                      <Btn
                        value="enroll now"
                        onClick={enrollTheCourse}
                        variant="primary"
                        id={element._id}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="About" title="About">
                      {element.description}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Suscipit distinctio mollitia nisi illo officiis incidunt
                      laudantium dicta tempora! Neque totam fuga aperiam ab
                      dolores eaque suscipit rerum voluptatem architecto!
                      Eveniet.
                    </Tab>
                    <Tab eventKey="Instructor" title="Instructor">
                      2
                    </Tab>
                    <Tab eventKey="Syllabus" title="Syllabus">
                      {element.lectures.map((lecture, index) => {
                        return (
                          <div>
                            <div>
                              <ul>
                                <li>
                                  <h6>
                                    Lecture {index + 1}: {lecture.title}
                                  </h6>
                                  <p>{element.description}</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default CourseInfo;
