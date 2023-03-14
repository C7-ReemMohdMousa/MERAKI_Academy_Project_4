import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../../App";
import Btn from "../../Btn/Btn";

const Search = () => {
  //context
  const {
    courses,
    setCourses,
    filterdCourses,
    setFilterdCourses,
    isSearching,
    setIsSearching,
    searchingResults,
    setSearchingResults,
  } = useContext(LearningContext);

  setIsSearching(false);

  return (
    <div>
      {searchingResults.map((element) => {
        return (
          <Card
            style={{ width: "18rem" }}
            key={element._id}
            className="courses-cards"
          >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{element.title}</Card.Title>
              <Card.Text>{element.description}</Card.Text>
              <Btn
                value="View Course Details"
                variant="primary"
                id={element._id}
                title={element.title}
                onClick={toCourseInfo}
              />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Search;
