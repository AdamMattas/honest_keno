import React from "react";
import box from "../public/box_working_2.svg";

const Box = props => {
  return (
    <img
      className={`origin-box ${props.position}`}
      alt="keno ball origin"
      src={box}
    />
  );
};

export default Box;
