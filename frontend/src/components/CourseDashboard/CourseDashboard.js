import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";
import { Col, Row, ListGroup, Tab, Nav, ListGroupItem } from "react-bootstrap";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import UploadLecture from "./UploadLecture";
import UpdateLecture from "./UpdateLecture";
import DeleteLecture from "./DeleteLecture";
import YouTube from "react-youtube";
import { BsCheckCircleFill } from "react-icons/bs";
import "./CourseDashboard.css";
import { Tabs, TabList, TabPanel } from "react-tabs";

const CourseDashboard = () => {
  //params
  const params = useParams();
  const id = params.id; //courseID

  //state
  const [isFectched, setIsFectched] = useState(false);
  const [key, setKey] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEnrollData, setIsEnrollData] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [completedLectures, setCompletedLectures] = useState([]);

  //context
  const {
    userId,
    token,
    role,
    course,
    setCourse,
    lectures,
    setLectures,
    enrollmentInfo,
    setEnrollmentInfo,
  } = useContext(LearningContext);

  //get the enrollment information of this course for this specefic user
  useEffect(() => {
    axios
      .get(
        `https://curious-learner.onrender.com/enroll/check/completed/lectures/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setEnrollmentInfo(response.data);
        setIsEnrollData(true);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //If Admin; activate the edit and the update buttons
  useEffect(() => {
    if (role == "admin") {
      setIsAdmin(true);
    }
  }, []);

  //get the course
  useEffect(() => {
    axios
      .get(`https://curious-learner.onrender.com/courses/${id}`)
      .then(function (response) {
        setLectures(response.data.lectures);
        setCourse(response.data);
        setIsFectched(true);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //CHECK IF THE USER IS THE INSTRUCTOR OF THE COURSE
  useEffect(() => {
    axios
      .get(
        `https://curious-learner.onrender.com/courses/isinstructor/${id}/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setIsInstructor(true);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const AddLectureToIsCompletedEnrollment = (lectId) => {
    console.log("enterd");
    axios
      .put(
        `https://curious-learner.onrender.com/enroll/complete/lecture/${id}/${lectId}`,
        { isCompleted: lectId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setCompletedLectures([...completedLectures, lectId]);
      })
      .catch(function (error) {
        throw error;
      });

    // enrollmentInfo[0].isCompleted.includes(lectId);
  };

  //check if the user completed the course, change the enrollment status
  const isTheCourseCompleted = () => {
    console.log("enterd");

    if (enrollmentInfo.length !== 0) {
      console.log("enterd2");
      console.log(course.lectures.length);
      console.log(enrollmentInfo[0].isCompleted.length);

      if (course.lectures.length === enrollmentInfo[0].isCompleted.length) {
        console.log("enterd3");
        console.log(enrollmentInfo[0].isCompleted.length);
        console.log(course.lectures.length);

        axios
          .put(
            `https://curious-learner.onrender.com/enroll/${id}`,
            { status: "completed", completedAt: Date.now() },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            throw error;
          });
      }
    }
  };

  isTheCourseCompleted();

  return (
    <div className="course-dashboard-page">
      {isFectched && enrollmentInfo ? (
        <div>
          <div className="course-detalis-dash">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            {isInstructor || isAdmin ? (
              <div>
                <UploadLecture id={id} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="season_tabs">
            {lectures.map((element, index) => {
              return (
                <div className="course-dashboard" key={element._id}>
                  <div className="season_tab">
                    <ListGroup>
                      <ListGroupItem
                        onClick={() => {
                          setLectureId(element._id);
                        }}
                        action
                        className="tab-title"
                      >
                        Lecture {index + 1}: {element.title}
                        {isEnrollData && enrollmentInfo.length ? (
                          enrollmentInfo[0].isCompleted.includes(element._id) ||
                          completedLectures.includes(element._id) ? (
                            <BsCheckCircleFill className="display-check" />
                          ) : (
                            <BsCheckCircleFill className="display-check-none " />
                          )
                        ) : (
                          ""
                        )}
                      </ListGroupItem>
                    </ListGroup>
                  </div>

                  {lectureId === element._id ? (
                    <div>
                      <div>
                        <div className="season_content">
                          <div className="lecture-content">
                            <h5>
                              Lecture {index + 1}: {element.title}
                            </h5>
                            {isInstructor || isAdmin ? (
                              <div className="update-delete-btns">
                                <UpdateLecture id={element._id} />
                                <DeleteLecture
                                  lectureId={element._id}
                                  courseId={id}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="video-container">
                              <YouTube
                                id={element._id}
                                videoId={element.videoURL}
                                onEnd={() => {
                                  console.log(element._id);
                                  AddLectureToIsCompletedEnrollment(
                                    element._id
                                  );
                                }}
                              />
                            </div>
                            <div className="lecture-description">
                              <p>{element.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CourseDashboard;

/* 
<div>
{isFectched ? (
  <div>
    <h1>{course.title}</h1>
    <p>{course.description}</p>
    {isInstructor || isAdmin ? (
      <div>
        <UploadLecture id={id} />
      </div>
    ) : (
      ""
    )}
    {lectures.map((element) => {
      return (
        <Tab.Container
          activeKey={key}
          onSelect={(k) => setKey(k)}
          key={element._id}
        >
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href={"#" + element._id}>
                  <div className="lecture-title">{element.title}</div>
                  {isEnrollData && enrollmentInfo.length ? (
                    enrollmentInfo[0].isCompleted.includes(
                      element._id
                    ) ? (
                      <BsCheckCircleFill className="display-check" />
                    ) : (
                      <BsCheckCircleFill className="display-check-none " />
                    )
                  ) : (
                    ""
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey={"#" + element._id}>
                  <div className="lecture-content">
                    <h5>{element.title}</h5>
                    {isInstructor || isAdmin ? (
                      <div>
                        <UpdateLecture id={element._id} />
                        <DeleteLecture
                          lectureId={element._id}
                          courseId={id}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <YouTube
                      id={element._id}
                      videoId={element.videoURL}
                      onEnd={() => {
                        console.log(element._id);
                        AddLectureToIsCompletedEnrollment(element._id);
                      }}
                    />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      );
    })}
  </div>
) : (
  "No data"
)}
</div>


 */
