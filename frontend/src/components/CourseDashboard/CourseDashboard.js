import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";

const CourseDashboard = () => {
  //params
  const params = useParams();
  const id = params.id;
  console.log(id);

  //state
  const [course, setCourse] = useState({});

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
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then(function (response) {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);
  console.log(course);

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      {course.lectures.map((element) => {
        return (
          <div>
            <h5>{element.title}</h5>
            <p>{element.description}</p>
            <video controls>
              <source src={element.videoURL} />
            </video>
          </div>
        );
      })}
    </div>
  );
};

export default CourseDashboard;
