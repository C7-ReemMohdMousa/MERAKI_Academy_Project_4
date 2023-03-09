import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { LearningContext } from "../../App";
const Dashboard = () => {
  //context
  const { name, setName, role, setRole } = useContext(LearningContext);

  //the dashboard will change based on the user role
  //1-student: completed and in progress courses
  //2- teachers: your courses with tools to update or delete the course 

  
  

  return (
    <div>
      <h2>Welcome Back {name}!</h2>
    </div>
  );
};

export default Dashboard;
