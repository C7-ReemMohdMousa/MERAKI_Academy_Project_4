import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  //context
  const {
    token,
    settoken,
    setIsLogged,
    isLogged,
    name,
    setName,
    role,
    setRole,
    setUserId,
    userId,
  } = useContext(LearningContext);

  const LoginUser = (e) => {
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then(function (response) {
        setResponse(response.data.message);
        setIsLogged(true);

        //save user token
        settoken(response.data.token);
        localStorage.setItem("userToken", JSON.stringify(response.data.token));

        //save user name
        setName(response.data.user.firstName);
        localStorage.setItem(
          "userName",
          JSON.stringify(response.data.user.firstName)
        );

        //save user id
        setUserId(response.data.user._id);
        localStorage.setItem("userId", JSON.stringify(response.data.user._id));

        //save user role
        setRole(response.data.user.role.role);
        localStorage.setItem(
          "userRole",
          JSON.stringify(response.data.user.role.role)
        );
      })
      .catch(function (error) {
        setResponse(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div>
      <Container>
        <Form>
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
        </Form>
        <Btn value="Login" variant="secondary" onClick={LoginUser} />
      </Container>

      {isLogged ? <Navigate to="/dashboard" replace={true} /> : response}
    </div>
  );
};

export default Login;
