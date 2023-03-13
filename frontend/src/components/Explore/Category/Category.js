import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../../App";
import Btn from "../../Btn/Btn";
import { ListGroup, Form, FormCheck, Badge } from "react-bootstrap";

const Category = () => {
  //context
  const { courses, setCourses, filterdCourses, setFilterdCourses } =
    useContext(LearningContext);

  //states
  const [categories, setCategories] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

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
        })
        .catch((error) => {
          throw error;
        });
    } else {
      const filteredCoursesAfterUnCheck = filterdCourses.filter((element) => {
        return element.category !== categoryId;
      });

      setFilterdCourses(filteredCoursesAfterUnCheck);
    }
  };

  return (
    <div>
      <div>
        <h6>Category</h6>
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
    </div>
  );
};

export default Category;
