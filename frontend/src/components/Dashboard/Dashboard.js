import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Btn from "../Btn/Btn";

//the dashboard will change based on the user role
//1-student: completed and in progress courses
//2- teachers: your courses with tools to update or delete the course

import { LearningContext } from "../../App";
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
  } = useContext(LearningContext);

  //states
  const [userEnrolled, setUserEnrolled] = useState([]);

  //get the in progress courses

  useEffect(() => {
    axios
      .get(`http://localhost:5000/enroll//myinProgressCourses/${userId}`, {
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

  const goToCourse = () =>{
    
  }

  return (
    <div>
      <h2>Welcome Back {name}!</h2>
      <div className="dasboard-courses-container">
        <h4>in progress courses</h4>
        {console.log(userEnrolled)}
        {userEnrolled.map((element) => {
          return (
            <div key={element._id}>
              <h6>{element.course.title}</h6>
              <Btn
                value="go to course"
                id={element.course._id}
                onClick={goToCourse}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
