import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Input, Space } from "antd";
import Search from "antd/es/transfer/search";
import { nav, Nav } from "react-bootstrap";
import logo from "../images/logo.png";

import "./Nav.css";

const DashboardNavigation = () => {
  const navigate = useNavigate();

  const {
    setIsLogged,
    settoken,
    setName,
    setUserId,
    setRole,
    isSearching,
    setIsSearching,
    searchingResults,
    setSearchingResults,
  } = useContext(LearningContext);

  const Logout = () => {
    localStorage.setItem("userToken", JSON.stringify(null));
    settoken("");
    setIsLogged(false);
    // setRole("");
    // setUserId("");
    // setName("");
  };

  const { Search } = Input;

  // const suffix = (
  //   <AudioOutlined
  //     style={{
  //       fontSize: 16,
  //       color: "#1890ff",
  //     }}
  //   />
  // );

  const onSearch = (value) => {
    axios
      .get(
        `https://curious-learner.onrender.com/courses/search/results/${value}`
      )
      .then((response) => {
        console.log(response.data);
        setIsSearching(true);
        setSearchingResults(response.data);
        navigate(`/explore`);
      })
      .catch((error) => {
        throw error;
      });
  };

  const goToHome = () => {
    navigate(`/`);
  };

  return (
    <div className="sticky-top">
      {/* className="sticky" */}
      <Nav
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: ".2rem",
          }}
        >
          <Nav.Item>
            <h2>
              {/* <img src={logo} style={{ width: "2rem", height: "2rem" }} /> */}
              Curious
              <span
                style={{
                  color: "#0d6efd",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={goToHome}
              >
                Learner
              </span>
            </h2>
          </Nav.Item>
          <div>
            <Space direction="vertical">
              <Search
                placeholder="search here.."
                allowClear
                enterButton="Search"
                size="medium"
                onSearch={onSearch}
              />
            </Space>
          </div>

          <Nav.Item>
            <Nav.Link href="/explore"> Explore</Nav.Link>
          </Nav.Item>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Nav.Item>
            <Nav.Link href="/"> Home</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/dashboard"> Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login" onClick={Logout}>
              {" "}
              Logout
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </div>
  );
};
export default DashboardNavigation;
