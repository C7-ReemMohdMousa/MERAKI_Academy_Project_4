import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Btn.css"

const Btn = ({ value, onClick, id, variant }) => {
  return (
    <Button onClick={onClick} id={id} variant={variant}>
      {value} 
    </Button>
  );
};

export default Btn;
