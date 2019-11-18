import React from "react";

const Denomination = props => {
  let denom = props.denom;
  if (denom === 0.25) denom = "25";
  if (denom === 0.1) denom = "10";
  if (denom === 0.05) denom = "5";
  if (denom === 0.01) denom = "1";
  return (
    <div className="denomination">
      <span onClick={props.changeDenom}>{denom}&cent;</span>
    </div>
  );
};

export default Denomination;
