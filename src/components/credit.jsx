import React from "react";

const Credit = props => {
  console.log("TYPE: ", props.type);
  console.log("CREDIT: ", props.credit);
  const equation = props.credit.toFixed(2);
  const credit =
    props.type === "dollar" ? equation : Math.trunc(props.credit / props.denom);
  return (
    <div className="display__credit" onClick={props.toggle}>
      {`${props.type === "dollar" ? "$" : ""}${credit}`}
    </div>
  );
};

export default Credit;
