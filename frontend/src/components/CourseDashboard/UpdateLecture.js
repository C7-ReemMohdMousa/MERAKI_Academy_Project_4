import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Btn from "../Btn/Btn";
import { LearningContext } from "../../App";

const UpdateLecture = ({ id }) => {
  //contect
  const { token, lectures, setLectures, course } = useContext(LearningContext);

  //modal state
  const [show, setShow] = useState(false);

  //input state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoCode, setVideoCode] = useState("");
  const [response, setResponse] = useState("");
  const [hideSaveBtn, setHideSaveBtn] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setHideSaveBtn(false);
    setResponse("");
  };

  const saveTheEditedCourse = () => {
    axios
      .put(
        `https://curious-learner.onrender.com/courses/${course._id}/${id}`,
        { title, description, videoURL: videoCode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.message) {
          setResponse(response.data.message);
        } else {
          setHideSaveBtn(true);
          setResponse("Course Updated!");
          const newLecturesArr = lectures.map((element) => {
            if (element._id === id) {
              element.title = title;
              element.description = description;
              element.videoURL = videoCode;
              return element;
            } else {
              return element;
            }
          });
          setLectures(newLecturesArr);
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
          <Modal.Title>Edit Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lecture Title</Form.Label>
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
              <Form.Label>YouTube Video ID</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="ex: ZK3O402wf1c"
                onChange={(e) => {
                  setVideoCode(e.target.value);
                }}
              />
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

export default UpdateLecture;
