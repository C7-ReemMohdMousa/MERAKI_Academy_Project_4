import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";

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
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }, []);

  const goToCourse = (e) => {
    //go to course dashboard
    navigate(`/coursedashboard/${e.target.id}`);
  };

  return (
    <div>
      <h2>Welcome Back {name}!</h2>
      <div>
        <UploadCourse />
      </div>
      <div>
        <h4>Created Courese</h4>
        <div>
          {createdCourses.map((element) => {
            return (
              <div key={element._id}>
                <h6>{element.title}</h6>
                <div>
                  <Btn
                    id={element._id}
                    value="go to course"
                    variant="success"
                    onClick={goToCourse}
                  />
                  <UpdateCourse id={element._id} />
                  <DeleteCourse id={element._id} />
                </div>
              </div>
            );
          })}
        </div>

        {isFectched ? (
          <div className="dasboard-courses-container">
            <h4>in progress courses</h4>
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
        ) : (
          "no data"
        )}
      </div>
    </div>
  );
};

export default TeachersDashboard;