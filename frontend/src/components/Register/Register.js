import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import Btn from "../Btn/Btn";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [respose, setRespose] = useState("");

  const RegisterUser = () => {
    axios
      .post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        email,
        password,
        age,
        role,
      })
      .then(function (response) {
        console.log(response.data.message);
        setRespose(response.data.message);
      })
      .catch(function (error) {
        setRespose(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
                console.log(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              onChange={(e) => {
                setage(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="student"
              checked
              onChange={(e) => {
                console.log(e.target.value);

                setRole("64060d4149b1402fedf92a91");
              }}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Student
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="teacher"
              onChange={(e) => {
                setRole("64060f50382bf441f2e08e7d");
              }}
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Teacher
            </label>
          </div>
        </Form>
        <Btn value="Register" variant="secondary" onClick={RegisterUser} />

      </Container>
      {respose}
    </div>
  );
};

export default Register;
