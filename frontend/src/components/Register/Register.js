import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { LearningContext } from "../../App";
import { Navigate, useNavigate, navigate } from "react-router-dom";

import Btn from "../Btn/Btn";
import { Form, Container, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../images/logo.png";

const Register = () => {
  //context
  const { name, setName, role, setRole } = useContext(LearningContext);
  const navigate = useNavigate();

  //states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respose, setRespose] = useState("");
  const [isRegisterd, setIsRegisterd] = useState(false);

  //variables
  let roleText;

  const RegisterUser = (e) => {
    axios
      .post("https://curious-learner.onrender.com/users/register", {
        firstName,
        lastName,
        email,
        password,
        age,
        role,
      })
      .then(function (response) {
        setRespose(response.data.message);
        setIsRegisterd(true);
      })
      .catch(function (error) {
        throw error.response.data;
        // setRespose(error.response.data.message);
      });
  };

  // const getRole = (e) => {
  //   roleText = e.target.value;
  //   console.log(roleText);
  //   axios
  //     .get(`https://curious-learner.onrender.com/roles/${roleText}`)
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
      {/* <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
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
        <br />
        <Btn value="Register" variant="secondary" onClick={RegisterUser} />
      </Container> */}

      <MDBContainer fluid className="p-4">
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              Curious
              <span className="text-primary">Learner</span> <br />
              <span className="text-primary">Learn </span>
              <span>without Limits</span>
            </h1>

            <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      id="form1"
                      type="text"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      id="form1"
                      type="text"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form1"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form1"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

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
                      console.log(role);
                    }}
                  />
                </Form.Group>
                <br />

                <Btn onClick={RegisterUser} value="sign up" />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {respose}
      {isRegisterd ? <Navigate to="/login" replace={true} /> : ""}
    </div>
  );
};

export default Register;
