import React from "react";
import Inputter from "../components/inputter/Inputter";
import { faDirections } from "@fortawesome/free-solid-svg-icons";

const TestPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid red",
        backgroundColor: "white",
      }}
    >
      <Inputter />
    </div>
  );
};

export default TestPage;
