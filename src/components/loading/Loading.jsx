// Loading.jsx
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loading.css";

const Loading = () => (
  <div className="loading-container">
    <ClipLoader size={50} color={"#123abc"} loading={true} />
  </div>
);

export default Loading;
