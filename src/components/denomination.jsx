import React from "react";

const Denomination = props => {
  return (
    <div className="spacer-200">
      <span className="denomination">{props.denom}</span>
      <span>&#65504;</span>
    </div>
  );
};

export default Denomination;
