import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Btn from "../Btn/Btn";
import UploadCourse from "./UploadCourse";
import { LearningContext } from "../../App";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import { Tab, Tabs, Card, Form, Table } from "react-bootstrap";
import "./Dashboard.css";
import { BsPencilSquare } from "react-icons/bs";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSwitch,
} from "mdb-react-ui-kit";

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
  const { courses, setCourses, token, name, categories, setCategories, role } =
    useContext(LearningContext);

  //
  const [newCategory, setNewCategory] = useState("");
  const [response, setResponse] = useState("");
  const [users, setUsers] = useState([]);
  let status = "";

  //modal, change student to teacher
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

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

  //get users
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/all/users`)
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  const createNewCategory = () => {
    axios
      .post(`http://localhost:5000/courses/create/category`, {
        category: newCategory,
      })
      .then(function (response) {
        console.log(response.data);
        setResponse(`${response.data.category} is Added Successfully`);
      })
      .catch(function (error) {
        throw error;
      });
  };

  const changeToTeacher = (_id) => {
    axios
      .post(`http://localhost:5000/roles/change/role/${_id}`)
      .then(function (response) {
        console.log(response.data);
        setResponse(`Role is updated Successfully`);
      })
      .catch(function (error) {
        throw error;
      });
  };

  const updateUserInfo = (userId) => {
    console.log(status);
    axios
      .post(`http://localhost:5000/users/update/user/${userId}`, { status })
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
          <h2 style={{ color: "#0d6efd" }}>Welcome Back {name}!</h2>
          <p>Fully Control Admin Dashboard</p>
          <div>
            <UploadCourse />
          </div>
        </div>
        <div className="tabs">
          <Tabs
            defaultActiveKey="All Courses"
            id="tabs"
            className="mb-3"
            justify
            style={{ fontWeight: "bold" }}
          >
            <Tab eventKey="All Courses" title="All Courses">
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
                            <Card.Text>{element.thumbnail}</Card.Text>
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
            <Tab eventKey="Add Category" title="Add Category">
              <div className="create-category">
                <br />
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
                  {response}
                </Form>
              </div>
            </Tab>

            <Tab eventKey="users" title="All Users">
              <div className="users">
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((element, i) => {
                      return (
                        <tr key={element._id}>
                          <td>{i + 1}</td>
                          <td>{element._id}</td>

                          <td>{element.firstName}</td>
                          <td>{element.lastName}</td>
                          <td>{element.email}</td>
                          <td>
                            {element.role.role + " "}
                            {element.role.role == "student" ? (
                              // <BsPencilSquare
                              //   onClick={() => {
                              //     changeToTeacher(element._id);
                              //   }}
                              // />
                              <div>
                                <BsPencilSquare
                                  onClick={toggleShow}
                                  style={{ cursor: "pointer" }}
                                />

                                <MDBModal
                                  show={basicModal}
                                  setShow={setBasicModal}
                                  tabIndex="-1"
                                >
                                  <MDBModalDialog>
                                    <MDBModalContent>
                                      <MDBModalHeader>
                                        <MDBModalTitle>
                                          change role
                                        </MDBModalTitle>
                                        <MDBBtn
                                          className="btn-close"
                                          color="none"
                                          onClick={toggleShow}
                                        ></MDBBtn>
                                      </MDBModalHeader>
                                      <MDBModalBody>
                                        Do you want to change this user role to
                                        be a teacher?
                                      </MDBModalBody>

                                      <MDBModalFooter>
                                        <MDBBtn
                                          color="secondary"
                                          onClick={toggleShow}
                                        >
                                          No
                                        </MDBBtn>
                                        <Btn
                                          value="yes"
                                          onClick={() => {
                                            changeToTeacher(element._id);
                                            toggleShow();
                                          }}
                                        />
                                      </MDBModalFooter>
                                    </MDBModalContent>
                                  </MDBModalDialog>
                                </MDBModal>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {element.role.role == "student" ||
                            element.role.role == "teacher" ? (
                              <MDBSwitch
                                id="flexSwitchCheckChecked"
                                defaultChecked={
                                  element.status == "active" ? true : false
                                }
                                onClick={(e) => {
                                  if (e.target.checked == false) {
                                    // setStatus("blocked");
                                    status = "blocked";
                                    updateUserInfo(element._id);
                                  } else if (e.target.checked == true) {
                                    // setStatus("active");
                                    status = "active";
                                    updateUserInfo(element._id);
                                  }
                                }}
                              />
                            ) : (
                              <MDBSwitch
                                defaultChecked
                                disabled
                                id="flexSwitchCheckCheckedDisabled"
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
