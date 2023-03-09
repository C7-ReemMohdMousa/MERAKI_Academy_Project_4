import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";
import { Media, Video } from "@vidstack/player-react";
import Iframe from "react-iframe";

const CourseDashboard = () => {
  //params
  const params = useParams();
  const id = params.id;
  console.log(id);

  //state
  const [course, setCourse] = useState({});
  const [isFectched, setIsFectched] = useState(false);

  //context
  const {
    courses,
    setCourses,
    userId,
    token,
    enrolledCourses,
    setEnrolledCourses,
  } = useContext(LearningContext);

  //get the course
  useEffect(() => {
    console.log("enterd");
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then(function (response) {
        console.log("enterd");
        setCourse(response.data);
        setIsFectched(true);
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  console.log(course);

  return (
    <div>
      {isFectched ? (
        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          {course.lectures.map((element) => {
            return (
              <div>
                <h5>{element.title}</h5>
                <p>{element.description}</p>
                <Iframe url={element.videoURL} />
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CourseDashboard;
