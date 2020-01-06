import React from "react";
import box from "../public/box_working_blue.svg";
import circle from "../public/circle_working_blue.svg";

const Box = props => {
  const rotate = props.status === "running" ? props.rotate : "";

  return (
    <React.Fragment>
      <img
        className={`origin-box ${props.boxPosition}`}
        alt="keno ball origin"
        src={box}
      />

      <img
        className={`origin-circle ${props.circlePosition} ${rotate}`}
        alt="keno ball origin"
        src={circle}
      />
    </React.Fragment>
  );
};

export default Box;
