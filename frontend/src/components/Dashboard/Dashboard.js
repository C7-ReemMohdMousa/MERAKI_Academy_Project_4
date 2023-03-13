import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
//the dashboard will change based on the user role
//1-student: completed and in progress courses
//2- teachers: your courses with tools to update or delete the course

import StudentsDashboard from "./StudentsDashboard";
import TeachersDashboard from "./TeachersDashboard";


const Dashboard = () => {
  //context
  const { role } = useContext(LearningContext);
  console.log(role);
  return (
    <div>
      {role == "student" && <StudentsDashboard />}
      {role == "teacher" && <TeachersDashboard />}
      {role == "admin" && <AdminDashboard />}
    </div>
  );
};

//different dashboards for teachers and studens

const AdminDashboard = () => {
  //useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  //context
  const { courses, setCourses, token, name } = useContext(LearningContext);

  const goToCourse = (e) => {
    //go to course dashboard
    navigate(`/coursedashboard/${e.target.id}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses`)
      .then(function (response) {
        console.log(response.data);
        setCourses(response.data.courses);
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
        <h4>All Courese</h4>
        <div>
          {courses.map((element) => {
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
      </div>
    </div>
  );
};

export default Dashboard;
