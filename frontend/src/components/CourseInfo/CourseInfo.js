import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";

const CourseInfo = () => {
  const params = useParams();
  const id = params.id;

  //states
  const [isEnrolled, setIsEnrolled] = useState(false);

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
  const course = courses.filter((element) => {
    return element._id === id;
  });

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
        setIsEnrolled(true);
        setEnrolledCourses([...enrolledCourses, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <div>
      {course.map((element) => {
        return (
          <div key={element._id}>
            <h1>{element.title}</h1>
            <p>{element.description}</p>

            {isEnrolled ? (
              "you're already enrolled"
            ) : (
              <Btn
                value="enroll now"
                onClick={enrollTheCourse}
                variant="primary"
                id={element._id}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseInfo;
