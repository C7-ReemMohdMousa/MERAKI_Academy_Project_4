import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import logo from "../images/logo.png";

const Login = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  let isRegisterd = false;

  //
  const navigate = useNavigate();

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
        console.log(error.response);
      });
  };

  const handleGoogleSignIn = (credentialResponse) => {
    console.log(credentialResponse);
    let userInfo = jwt_decode(credentialResponse.credential);

    //check if the user exsisted in the data base
    axios
      .post("http://localhost:5000/users/login/check/google/user", {
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
      })
      .then(function (response) {
        console.log(response.data);

        //if the user loggin in correctly, save his data in the local storage
        if (response.data.success) {
          setIsLogged(true);

          //save user token
          settoken(response.data.token);
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.token)
          );

          //save user name
          setName(response.data.user.firstName);
          localStorage.setItem(
            "userName",
            JSON.stringify(response.data.user.firstName)
          );

          //save user id
          setUserId(response.data.user._id);
          localStorage.setItem(
            "userId",
            JSON.stringify(response.data.user._id)
          );
          console.log(response.data.user);

          //save user role
          setRole(response.data.user.role.role);
          console.log(response.data.user.role.role);

          localStorage.setItem(
            "userRole",
            JSON.stringify(response.data.user.role.role)
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* <Container>
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
      </Container> */}

      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isLogged ? <Navigate to="/dashboard" replace={true} /> : response}

            <div className="text-center text-md-start mt-4 pt-2">
              <Btn value="Login" onClick={LoginUser} />

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleSignIn(credentialResponse);
                  }}
                  onError={() => {
                    //pop-up error
                    console.log("Login Failed");
                  }}
                />
              </div>

              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="link-danger"
                  onClick={() => {
                    navigate(`/register`);
                  }}
                >
                  Register
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
