import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { LearningContext } from "../../App";
import { Navigate } from "react-router-dom";

import Btn from "../Btn/Btn";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";

const Register = () => {
  //context
  const { name, setName, role, setRole } = useContext(LearningContext);

  //states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respose, setRespose] = useState("");

  //variables
  let roleText;
  let isRegisterd = false;

  const RegisterUser = (e) => {
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
        setRespose(response.data.message);
        isRegisterd = true;
      })
      .catch(function (error) {
        setRespose(error.response.data.message);
      });
  };

  // const getRole = (e) => {
  //   roleText = e.target.value;
  //   console.log(roleText);
  //   axios
  //     .get(`http://localhost:5000/roles/${roleText}`)
  //     .then(function (response) {
  //       setRole(response.role);
  //       console.log(response.role);
  //       console.log(role);
  //     })
  //     .catch(function (error) {
  //       setRespose(error.response.data.message);
  //     });
  // };

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

          <Form.Group controlId="kindOfStand">
            <Form.Check
              value="design"
              type="radio"
              aria-label="radio 1"
              label="Student"
              name="role"
              inline
              onChange={(e) => {
                setRole("64060d4149b1402fedf92a91");
              }}
            />
            <Form.Check
              value="food"
              type="radio"
              aria-label="radio 2"
              label="Teacher"
              name="role"
              inline
              onChange={(e) => {
                setRole("640cf5ae6308a0c0b07e5792");
              }}
            />
          </Form.Group>
        </Form>
        <br/>
        <Btn value="Register" variant="secondary" onClick={RegisterUser} />
      </Container>
      {respose}
      {isRegisterd ? <Navigate to="/login" replace={true} /> : ""}
    </div>
  );
};

export default Register;
