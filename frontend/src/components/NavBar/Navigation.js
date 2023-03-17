import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LearningContext } from "../../App";
import Btn from "../Btn/Btn";
import Search from "antd/es/transfer/search";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

import { nav, Nav } from "react-bootstrap";

import "./Nav.css";

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
              Curious<span style={{ color: "#0d6efd" }}>Learner</span>
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
            <Nav.Link href="/login"> Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </div>
  );
};

export default Navigation;
