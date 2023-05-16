import React, { useContext, useState, useEffect } from "react";
import Btn from "../Btn/Btn";
import axios from "axios";
import { LearningContext } from "../../App";

const DeleteLecture = ({ lectureId, courseId }) => {
  //
  let newLectures;

  //context
  const { token, course, setCourse, lectures, setLectures } =
    useContext(LearningContext);

  //delete lecture
  const deleteMyLecture = () => {
    axios
      .delete(
        `https://curious-learner.onrender.com/courses/${courseId}/${lectureId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        const newLecturesArr = lectures.filter((element) => {
          return element._id !== lectureId;
        });
        setLectures(newLecturesArr);
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
