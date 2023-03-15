import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../../App";
import Btn from "../../Btn/Btn";
import { ListGroup, Form, FormCheck, Badge } from "react-bootstrap";
import { logDOM } from "@testing-library/react";

const Category = () => {
  //context
  const {
    courses,
    setCourses,
    filterdCourses,
    setFilterdCourses,
    searchingResults,
    setSearchingResults,
    categories,
    setCategories,
  } = useContext(LearningContext);

  //states
  const [isFetched, setIsFetched] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  let testArrForSearch = [];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/all/categories`)
      .then((response) => {
        // console.log(response.data);
        setIsFetched(true);
        setCategories(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  //get the courses by category
  const getCoursesByCategory = (categoryId, e) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      axios
        .get(`http://localhost:5000/courses/categoryid/${categoryId}`)
        .then((response) => {
          setFilterdCourses([...filterdCourses, response.data].flat());
          setCategoryID(categoryId);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      console.log(filterdCourses);
      const filteredCoursesAfterUnCheck = filterdCourses.filter((element) => {
        return element.category !== categoryId;
      });

      setFilterdCourses(filteredCoursesAfterUnCheck);
    }

    if (searchingResults.length !== 0) {
      const filteredSearch = searchingResults.filter((element) => {
        console.log(element.category._id);
        console.log(categoryId);

        return element.category._id == categoryId;
      });
      console.log(filteredSearch);
    }
  };

  const filterByLevel = (levelValue, e) => {
    console.log(levelValue);
    if (e.target.checked) {
      axios
        .get(
          `http://localhost:5000/courses/all/courses/bylevel/?level=${levelValue}`
        )
        .then((response) => {
          console.log(response.data);
          if (filterdCourses.length !== 0) {
            const filterTheFilterdArr = filterdCourses.filter((element) => {
              return element.level == levelValue;
            });

            setFilterdCourses(filterTheFilterdArr);
          } else {
            setFilterdCourses(response.data);
          }
        })
        .catch((error) => {
          throw error;
        });

      // if (filterdCourses.length !== 0) {
      //   const filterByLevelArr = filterdCourses.filter((element) => {
      //     return element.level === levelValue;
      //   });
      //   setFilterdCourses(filterByLevelArr);
      // }
      // //*
      // else {
      //   const filterByLevelArr = courses.filter((element) => {
      //     return element.level === levelValue;
      //   });
      //   setFilterdCourses(filterByLevelArr);
      // }
    }

    if (e.target.checked === false) {
      console.log(filterdCourses);
      const filteredCoursesAfterUnCheck = filterdCourses.filter((element) => {
        return element.level !== levelValue;
      });
      console.log(filteredCoursesAfterUnCheck);

      setFilterdCourses(filteredCoursesAfterUnCheck);
    }
    // }
  };

  return (
    <div>
      <div>
        <ListGroup style={{ maxWidth: "400px" }}>
          <ListGroup.Item active>Subject</ListGroup.Item>
          {isFetched ? (
            <div>
              {categories.map((element) => {
                return (
                  <div key={element._id}>
                    <ListGroup.Item>
                      <FormCheck
                        id={element._id}
                        inline
                        value={element.category}
                        // checked={isChecked}
                        onChange={(e) => {
                          getCoursesByCategory(element._id, e);
                        }}
                      />
                      {element.category}
                    </ListGroup.Item>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </ListGroup>
      </div>

      <div>
        <ListGroup style={{ maxWidth: "400px" }}>
          <ListGroup.Item active>Level</ListGroup.Item>
          <div>
            <div>
              <ListGroup.Item>
                <FormCheck
                  inline
                  onChange={(e) => {
                    filterByLevel("Beginner", e);
                  }}
                />
                Beginner
              </ListGroup.Item>
              <ListGroup.Item>
                <FormCheck
                  inline
                  onChange={(e) => {
                    filterByLevel("Intermediate", e);
                  }}
                />
                Intermediate
              </ListGroup.Item>
              <ListGroup.Item>
                <FormCheck
                  inline
                  onChange={(e) => {
                    filterByLevel("Advance", e);
                  }}
                />
                Advance
              </ListGroup.Item>
            </div>
          </div>
        </ListGroup>
      </div>
    </div>
  );
};

export default Category;
