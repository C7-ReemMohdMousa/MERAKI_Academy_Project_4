import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import axios from "axios";

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
        setEnrolledCourses(response.data);
        setIsEnrolled(true)
      })
      .catch(function (error) {
        throw error;
      });
  };

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
  };

  return (
    <div>
      {course.map((element) => {
        return (
          <div key={element._id}>
            <h1>{element.title}</h1>
            <p>{element.description}</p>

            {isEnrolled ? (
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
        );
      })}
    </div>
  );
};

export default CourseInfo;
