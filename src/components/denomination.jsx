import React from "react";
import Credit from "./credit";

const Denomination = props => {
  let denom = props.denom;
  if (denom === 0.25) denom = "25";
  if (denom === 0.1) denom = "10";
  if (denom === 0.05) denom = "5";
  if (denom === 0.01) denom = "1";
  return (
    <div className="spacer-200">
      <span className="denomination" onClick={props.changeDenom}>
        {denom}
      </span>
      <span>&#65504;</span>
      <Credit credit={props.credit} denom={props.denom} />
    </div>
  );
};

export default Denomination;
