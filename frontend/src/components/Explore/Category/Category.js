import React, {
  useContext,
  useState,
  useEffect,
  useSyncExternalStore,
} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../../App";
import Btn from "../../Btn/Btn";
import { ListGroup, Form, FormCheck, Badge } from "react-bootstrap";

const Category = ({ courses, setCourses }) => {
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [categorizedCourses, setCategorizedCourses] = useState([]);

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
  const getCoursesByCategory = (categoryId) => {
    axios
      .get(`http://localhost:5000/courses/categoryid/${categoryId}`)
      .then((response) => {
        console.log(response.data);
        setCategorizedCourses(response.data);
        setCourses(categorizedCourses);
      })
      .catch((error) => {
        throw error;
      });
  };
  console.log(categorizedCourses);
  console.log(courses);
  const [key, setKey] = useState("");

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
                    <ListGroup.Item
                      active={key}
                      onChange={() => {
                        console.log("h");
                        getCoursesByCategory(element._id);
                        setKey(key)
                      }}
                    >
                      <FormCheck id="custom-checkbx" inline />
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
