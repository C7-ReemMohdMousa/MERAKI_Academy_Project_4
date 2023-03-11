import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";

//the dashboard will change based on the user role
//1-student: completed and in progress courses
//2- teachers: your courses with tools to update or delete the course

const Dashboard = () => {
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
  } = useContext(LearningContext);

  return (
    <div>
      {role == "student" && <StudentsDashboard />}
      {role == "teacher" && <TeachersDashboard />}
    </div>
  );
};

//different dashboards for teachers and studens

const StudentsDashboard = () => {
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
  } = useContext(LearningContext);

  //states
  const [userEnrolled, setUserEnrolled] = useState([]);

  //get the in progress courses

  useEffect(() => {
    axios
      .get(`http://localhost:5000/enroll/myinProgressCourses/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setUserEnrolled(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }, []);

  //go to course dashboard
  const goToCourse = (e) => {
    navigate(`/coursedashboard/${e.target.id}`);
  };

  //cancel enrollment
  const cancelEnrollment = (e) => {
    let courseId = e.target.id;
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

  return (
    <div>
      <h2>Welcome Back {name}!</h2>
      <div className="dasboard-courses-container">
        <h4>in progress courses</h4>
        {console.log(userEnrolled)}
        {userEnrolled.map((element) => {
          return (
            <div key={element.course._id}>
              <h6>{element.course.title}</h6>
              <Btn
                value="go to course"
                id={element.course._id}
                onClick={goToCourse}
              />
              <Btn
                value="cancel enrollment"
                variant="danger"
                id={element.course._id}
                onClick={cancelEnrollment}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
  } = useContext(LearningContext);

  //state
  const [createdCourses, setCreatedCourses] = useState([]);

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
                  <Btn value="edit" />
                  <Btn value="go to course" variant="success" />
                  <Btn value="delete" variant="danger" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
