import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

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
        console.log(response.data.user);

        //save user role
        setRole(response.data.user.role.role);
        console.log(response.data.user.role.role);

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

  const handleGoogleSignIn = (credentialResponse) => {
    console.log(credentialResponse);
    let userInfo = jwt_decode(credentialResponse.credential);
    console.log(userInfo.email);
    let isEmailUnique = false;

    //check if the user exsisted in the data base
    axios
      .post("http://localhost:5000/users/login/google/user", {
        email: userInfo.email,
      })
      .then(function (response) {
        if(response.data.success){
          isEmailUnique = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      // if(isEmailUnique){
      //   axios
      // .post("http://localhost:5000/users/login", {
      //   email,
      //   password,
      // })
      // .then(function (response) {
    
      // })
      // .catch(function (error) {
        
      // });

      // }

    //if not register him as a new user
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
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleSignIn(credentialResponse);
        }}
        onError={() => {
          //pop-up error
          console.log("Login Failed");
        }}
      />
      {isLogged ? <Navigate to="/dashboard" replace={true} /> : response}
    </div>
  );
};

export default Login;
