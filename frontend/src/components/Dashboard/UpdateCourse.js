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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to get the categoryID
  const getCategory = (e) => {
    let categoryName = e.target.value;
    console.log(categoryName);

    axios
      .get(`http://localhost:5000/courses/category/${categoryName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        `http://localhost:5000/courses/${id}`,
        { title, description, category, level },
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
                  setTitle(e.target.value);
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
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

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
                <option value="Litreture">Litreture</option>
                <option value="IT">IT & Data Analysis</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setLevel(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option>Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermidate">Intermidate</option>
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
