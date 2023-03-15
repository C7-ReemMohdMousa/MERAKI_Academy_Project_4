import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import { Input, Space } from "antd";
import Search from "antd/es/transfer/search";

import { nav, Nav } from "react-bootstrap";

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
      .get(`http://localhost:5000/courses/search/results/${value}`)
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

  return (
    <div>
      <Nav style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Space>
        <Nav.Item>
          <Nav.Link href="/"> Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/explore"> Explore</Nav.Link>
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
      </Nav>
    </div>
  );
};
export default DashboardNavigation;
