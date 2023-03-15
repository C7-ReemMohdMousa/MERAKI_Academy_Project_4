import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import { Tab, Tabs, Card, Form } from "react-bootstrap";
import "./Dashboard.css";

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
  const { courses, setCourses, token, name, categories, setCategories } =
    useContext(LearningContext);

  //
  const [newCategory, setNewCategory] = useState("");

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

  console.log(courses);

  const createNewCategory = () => {
    axios
      .post(`http://localhost:5000/courses/create/category`, {
        category: newCategory,
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
      <div>
        <div className="dashboard-welcome">
          <h2>Welcome Back {name}!</h2>
          <p>Fully Control Admin Dashboard</p>
          <div>
            <UploadCourse />
          </div>
        </div>
        <div className="tabs">
          <Tabs defaultActiveKey="profile" id="tabs" className="mb-3" justify>
            <Tab eventKey="home" title="All Courese">
              <div>
                <div className="all-courses">
                  {courses.map((element) => {
                    return (
                      <div key={element._id} className="all-courses-cards">
                        <Card>
                          <Card.Header>{element.category.category}</Card.Header>
                          <Card.Body>
                            <Card.Title>
                              <div className="course-title">
                                <h5>{element.title}</h5>
                              </div>
                            </Card.Title>
                            <Card.Text>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </Card.Text>
                            <div className="btns">
                              <Btn
                                id={element._id}
                                value="Go to course"
                                variant="success"
                                onClick={goToCourse}
                              />
                              <UpdateCourse id={element._id} />
                              <DeleteCourse id={element._id} />
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Add Category">
              <div className="create-category">
                <h5>Here You Can Add a New Category:</h5>
                <Form>
                  {/* <Form.Label> Here You Can Add a New Category:</Form.Label> */}
                  <Form.Group className="mb-3" id="category-input">
                    <Form.Control
                      type="email"
                      placeholder="Enter a New Category"
                      onChange={(e) => {
                        setNewCategory(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <div className="create-category-btn">
                    <Btn
                      variant="primary"
                      type="submit"
                      value="Submit"
                      onClick={(e) => {
                        createNewCategory(e);
                      }}
                    />
                  </div>
                </Form>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
