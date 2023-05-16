import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Btn from "../Btn/Btn";
import { LearningContext } from "../../App";

const UpdateCourse = ({ id }) => {
  //contect
  const {
    courses,
    setCourses,
    userId,
    token,
    name,
    enrolledCourses,
    setEnrolledCourses,
    role,
    createdCourses,
    setCreatedCourses,
  } = useContext(LearningContext);

  //modal state
  const [show, setShow] = useState(false);

  //input state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [response, setResponse] = useState("");
  const [hideSaveBtn, setHideSaveBtn] = useState(false);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setHideSaveBtn(false);
    setResponse("");
    setShow(true);
  };

  //get the course

  useEffect(() => {
    axios
      .get(`https://curious-learner.onrender.com/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setThumbnail(response.data.thumbnail);
        setImage(response.data.image);
        setLevel(response.data.level);
        setCategory(response.data.category);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //to get the categoryID
  const getCategory = (e) => {
    let categoryName = e.target.value;
    console.log(categoryName);

    axios
      .get(
        `https://curious-learner.onrender.com/courses/category/${categoryName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setCategory(response.data.categoryId);
      })
      .catch(function (error) {
        throw error;
      });
  };

  const saveTheEditedCourse = () => {
    axios
      .put(
        `https://curious-learner.onrender.com/courses/${id}`,
        { title, description, category, level, image, thumbnail },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.message) {
          setResponse(response.data.message);
        } else {
          setTitle("");
          setDescription("");
          setHideSaveBtn(true);
          setResponse("Course Updated!");

          const updatedCourses = courses.map((element) => {
            if (element._id === id) {
              element.title = title;
              element.description = description;
              element.category = category;
              element.level = level;
              return element;
            } else {
              return element;
            }
          });
          setCourses(updatedCourses);

          if (role === "teacher") {
            const updatedCourses = createdCourses.map((element) => {
              if (element._id === id) {
                element.title = title;
                element.description = description;
                element.category = category;
                element.level = level;
                return element;
              } else {
                return element;
              }
            });
            setCreatedCourses(updatedCourses);
          }
        }
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      <Btn value="Edit" variant="primary" onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  if (e.target.value) {
                    setTitle(e.target.value);
                  }
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  if (e.target.value) {
                    setThumbnail(e.target.value);
                  }
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  if (e.target.value) {
                    setDescription(e.target.value);
                  }
                }}
              />
            </Form.Group>

            {role === "admin" ? (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    if (e.target.value) {
                      setImage(e.target.value);
                    }
                  }}
                />
              </Form.Group>
            ) : (
              ""
            )}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select
                aria-label="Default select example"
                onChange={getCategory}
              >
                <option>Category</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="IT & Data Analysis">IT & Data Analysis</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  if (e.target.value) {
                    console.log(e.target.value);
                    setLevel(e.target.value);
                  }
                }}
              >
                <option>Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
              </Form.Select>
            </Form.Group>
          </Form>
          {response}
        </Modal.Body>
        <Modal.Footer>
          <Btn value="Close" variant="secondary" onClick={handleClose} />
          {hideSaveBtn ? (
            ""
          ) : (
            <Btn value="Save" variant="primary" onClick={saveTheEditedCourse} />
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateCourse;
