import React from "react";
import KenoBall from "./kenoBall";

const KenoBallRack = props => {
  console.log("Props Random: ", props.random);
  console.log("Props Hits: ", props.hits);
  const balls = [];

  if (props.random !== undefined) {
    if (props.hits !== undefined) {
      props.random.forEach(rand => {
        if (props.hits.indexOf(rand) !== -1) {
          balls.push({ number: rand, status: "ball-green" });
          console.log("STATUS: ", balls);
        } else {
          balls.push({ number: rand, status: "ball-red" });
        }
      });
    }
  }

  if (props.random !== undefined) {
    const kenoBalls = balls.map(ball => (
      //number.number < 41 ? section.top.push(number) : section.bottom.push(number)
      <KenoBall number={ball.number} status={ball.status} />
    ));

    return kenoBalls;
  }

  return null;
};

export default KenoBallRack;