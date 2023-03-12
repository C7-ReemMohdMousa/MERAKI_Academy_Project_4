import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";
import { Media, Video } from "@vidstack/player-react";
import Iframe from "react-iframe";
import { Col, Row, ListGroup, Tab } from "react-bootstrap";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import UploadLecture from "./UploadLecture";
import UpdateLecture from "./UpdateLecture";
import DeleteLecture from "./DeleteLecture";

const CourseDashboard = () => {
  //params
  const params = useParams();
  const id = params.id; //courseID

  //state
  const [course, setCourse] = useState({});
  const [isFectched, setIsFectched] = useState(false);
  const [key, setKey] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  //If Admin; activate the edit and the update buttons
  useEffect(() => {
    if (role == "admin") {
      setIsAdmin(true);
    }
  }, []);

  //get the course
  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then(function (response) {
        setCourse(response.data);
        setIsFectched(true);
      })
      .catch(function (error) {
        throw error;
      });
  }, [course]);

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

  return (
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
          {course.lectures.map((element) => {
            return (
              <Tab.Container
                id="list-group-tabs-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                key={element._id}
              >
                <Row>
                  <Col sm={4}>
                    <ListGroup>
                      <ListGroup.Item action href={"#" + element._id}>
                        {element.title}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey={"#" + element._id}>
                        <div>
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
                          <p>{element.description}</p>
                          <Iframe url={element.videoURL} />
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
  );
};

export default CourseDashboard;
