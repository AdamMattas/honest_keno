import React from "react";

const Credit = props => {
  console.log("TYPE: ", props.type);
  const equation = props.credit.toFixed(2);
  const credit = props.type === "dollar" ? equation : props.credit;
  return (
    <div className="credit-text" onClick={props.toggle}>
      {`${props.type === "dollar" ? "$" : ""}${credit}`}
    </div>
  );
};

export default Credit;
