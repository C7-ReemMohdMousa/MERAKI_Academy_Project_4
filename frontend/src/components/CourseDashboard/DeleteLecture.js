import React, { useContext, useState, useEffect } from "react";
import Btn from "../Btn/Btn";
import axios from "axios";
import { LearningContext } from "../../App";

const DeleteLecture = ({ lectureId, courseId }) => {
  //context
  const {
    courses,
    setCourses,
    userId,
    token,
    enrolledCourses,
    setEnrolledCourses,
  } = useContext(LearningContext);


  //delete lecture
  const deleteMyLecture = () => {
    axios
      .delete(`http://localhost:5000/courses/${courseId}/${lectureId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      <Btn value="Delete" variant="danger" onClick={deleteMyLecture} />
    </div>
  );
};

export default DeleteLecture;
