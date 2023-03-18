import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import { Tab, Tabs, Card, Form } from "react-bootstrap";
import { MDBFile } from "mdb-react-ui-kit";

const TeachersDashboard = () => {
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
    createdCourses,
    setCreatedCourses,
    completedCourses,
    setCompletedCourses,
  } = useContext(LearningContext);

  //states
  const [userEnrolled, setUserEnrolled] = useState([]);
  const [isFectched, setIsFectched] = useState(false);
  const [instructor, setInstructor] = useState({});
  const [instructorImg, setInstructorImg] = useState("");
  const [instructorDescription, setInstructorDescription] = useState("");

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

  //get created courses
  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/created/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
        setCreatedCourses(response.data);
        setIsFectched(true);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }, []);

  const goToCourse = (courseID) => {
    //go to course dashboard
    navigate(`/coursedashboard/${courseID}`);
  };

  //go to explore
  const goToExplore = () => {
    navigate(`/explore`);
  };

  //get users to get the instructor image and info
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/all/users`)
      .then(function (response) {
        console.log(response.data);
        const user = response.data.filter((element) => {
          return element._id === userId;
        });
        setInstructor(user[0]);
        setInstructorDescription(user[0].description);
        setInstructorImg(user[0].image);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  const updateUserInfo = () => {
    axios
      .post(`http://localhost:5000/users/update/user/${userId}`, {
        image: instructorImg,
        description: instructorDescription,
      })
      .then(function (response) {
        console.log(response.data);
        setInstructor(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      <div className="dashboard-welcome">
        <h2 style={{ color: "#0d6efd" }}>Welcome Back {name}!</h2>
        <p>
          Thank you for giving us your time and efforts, and always remember
          knowledge shared is knowledge squared :)
        </p>
        <div>
          <UploadCourse />
        </div>
      </div>
      <div>
        <div className="tabs">
          <Tabs
            defaultActiveKey="Created Courese"
            id="tabs"
            className="mb-3"
            justify
            style={{ fontWeight: "bold" }}
          >
            <Tab eventKey="Created Courese" title="Created Courese">
              <div>
                <div className="all-courses">
                  {isFectched ? (
                    createdCourses.length !== 0 ? (
                      createdCourses.map((element) => {
                        return (
                          <div key={element._id} className="all-courses-cards">
                            <Card>
                              <Card.Header>
                                {element.category.category}
                              </Card.Header>
                              <Card.Body>
                                <Card.Title>
                                  <div className="course-title">
                                    <h5>{element.title}</h5>
                                  </div>
                                </Card.Title>
                                <Card.Text>{element.thumbnail}</Card.Text>
                                <div className="btns">
                                  <Btn
                                    id={element._id}
                                    value="go to course"
                                    variant="success"
                                    onClick={() => {
                                      goToCourse(element._id);
                                    }}
                                  />
                                  <UpdateCourse id={element._id} />
                                  <DeleteCourse id={element._id} />
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-courses">
                        <br />
                        <h5>
                          Hello {name}, you have no created any course yet
                        </h5>
                        <p>
                          you can apload your first course by clicking on the
                          "Upload a New Course!" button up there!
                        </p>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Tab>

            <Tab eventKey="In Progress Courses" title="In Progress Courses">
              <div>
                <div className="all-courses">
                  {isFectched ? (
                    userEnrolled.length !== 0 ? (
                      userEnrolled.map((element) => {
                        console.log(element);
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
                    ) : (
                      <div className="no-courses">
                        <br />
                        <h5>
                          It looks like you have not enrolled in any courses
                          yet!
                        </h5>
                        <p>Explore our available courses now!</p>
                        <Btn value="Explore Courses" onClick={goToExplore} />
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Tab>
            <Tab eventKey="Completed Courses" title="Completed Courses">
              <div className="all-courses">
                {isFectched ? (
                  completedCourses.length !== 0 ? (
                    completedCourses.map((element) => {
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
                              <Card.Text>{element.thumbnail}</Card.Text>
                              <div className="btns">
                                <Btn
                                  value="go to course"
                                  id={element.course._id}
                                  onClick={() => {
                                    console.log(element.course._id);
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
                  ) : (
                    <div className="no-courses">
                      <br />
                      <h5>
                        It looks like you have not completed any courses yet!
                      </h5>
                      <p>Explore our available courses now!</p>
                      <Btn value="Explore Courses" onClick={goToExplore} />
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </Tab>

            <Tab eventKey="Edit your info!" title="Edit your info!">
              <br />
              <div className="instructor-info">
                <div>
                  <div>
                    <img src={instructor.image} className="bio-img" />
                  </div>
                  <div className="bio-description">
                    <br />
                    <p>{instructor.description} </p>
                  </div>
                </div>

                <div>
                  <Form>
                    <br />
                    <MDBFile
                      label="Upload your picture"
                      size="sm"
                      id="formFileSm"
                      onChange={(e) => {
                        console.log(e.target.files);
                        setInstructorImg(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        cols={50}
                        onChange={(e) => {
                          setInstructorDescription(e.target.value);
                        }}
                        placeholder="add some information about yourself!"
                      />
                    </Form.Group>
                  </Form>
                  <br />
                  <Btn value="Save" onClick={updateUserInfo} />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TeachersDashboard;
