import React from "react";

const Credit = props => {
  return (
    <div>
      {props.credit}
      <div>{props.denom}</div>
    </div>
  );
};

export default Credit;
