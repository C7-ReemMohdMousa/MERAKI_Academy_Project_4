import React, { useContext, useState, useEffect } from "react";
import Btn from "../Btn/Btn";
import axios from "axios";
import { LearningContext } from "../../App";

const DeleteCourse = ({ id }) => {
  //contect
  const {
    courses,
    setCourses,
    userId,
    token,
    setCreatedCourses,
    createdCourses,
  } = useContext(LearningContext);

  const deleteMyCourse = () => {
    axios
      .delete(`https://curious-learner.onrender.com/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
        const newInsturctorCoursesArr = createdCourses.filter((element) => {
          console.log(element);
          return element._id !== id;
        });
        setCreatedCourses(newInsturctorCoursesArr);

        const newAdminctorCoursesArr = courses.filter((element) => {
          console.log(element);
          return element._id !== id;
        });
        setCourses(newAdminctorCoursesArr);
        console.log(newAdminctorCoursesArr);
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      <Btn value="Delete" variant="danger" onClick={deleteMyCourse} />
    </div>
  );
};

export default DeleteCourse;
