import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import Search from "antd/es/transfer/search";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

import { nav, Nav } from "react-bootstrap";

import "./Nav.css"

const Navigation = () => {
  const navigate = useNavigate();

  const { Search } = Input;

  const { isSearching, setIsSearching, searchingResults, setSearchingResults } =
    useContext(LearningContext);

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

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
      <Nav style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
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
          <Nav.Link href="/register"> Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login"> Login</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navigation;
