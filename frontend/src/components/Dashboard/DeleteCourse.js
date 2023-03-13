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
      .delete(`http://localhost:5000/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
        const newCoursesArr = createdCourses.filter((element) => {
          console.log(element);
          return element._id !== id;
        });
        setCreatedCourses(newCoursesArr)
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
