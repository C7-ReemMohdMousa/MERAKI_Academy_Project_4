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
    role,
  } = useContext(LearningContext);

  //state
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  //If Admin; dectivate enroll button and activate go to course btn
  useEffect(() => {
    if (role == "admin") {
      setIsAdmin(true);
    }
  }, []);

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

  return (
    <div>
      {course.map((element) => {
        console.log(element._id);
        return (
          <div key={element._id}>
            <h1>{element.title}</h1>
            <p>{element.description}</p>

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
        );
      })}
    </div>
  );
};

export default CourseInfo;
