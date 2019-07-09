import React from "react";

const KenoBall = props => {
  console.log("RANDOM: ", props);
  return (
    <div className={`ball ball-${props.index + 1} ${props.status}`}>
      <span>{props.number}</span>
    </div>
  );
};

export default KenoBall;
