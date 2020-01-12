import React from "react";
import box from "../public/box_working_blue.svg";
import circle from "../public/circle_working_blue.svg";
import gear from "../public/gear.svg";
import gear2 from "../public/gear_2.svg";

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
        src={gear2}
      />

      <span className={`origin-tube ${props.tubePosition}`}></span>
    </React.Fragment>
  );
};

export default Box;
