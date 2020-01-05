import React from "react";
import KenoBall from "./kenoBall";

const KenoBallRack = props => {
  const balls = [];

  if (props.random !== undefined) {
    if (props.hits !== undefined) {
      props.random.forEach(rand => {
        if (props.hits.indexOf(rand) !== -1) {
          balls.push({ number: rand, status: "ball--green" });
        } else {
          balls.push({ number: rand, status: "ball--red" });
        }
      });
    }
  }

  if (props.random !== undefined && props.status !== "remove") {
    const kenoBalls = balls.map((ball, index) => (
      <KenoBall
        number={ball.number}
        status={ball.status}
        index={index}
        compStatus={props.status}
      />
    ));

    return kenoBalls;
  }

  return null;
};

export default KenoBallRack;
