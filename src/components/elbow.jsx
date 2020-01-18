import React from "react";
import elbow from "../public/elbow_black_sm.svg";

const Elbow = props => {
  return (
    <img
      className={`origin-box ${props.position}`}
      alt="keno ball origin"
      src={elbow}
    />
  );
};

export default Elbow;
