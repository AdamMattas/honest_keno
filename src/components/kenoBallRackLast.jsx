import React from "react";
import KenoBallLast from "./kenoBallLast";

const KenoBallRackLast = props => {
  console.log("Props Random: ", props.random);
  console.log("Props Hits: ", props.hits);
  const balls = [];

  if (props.random !== undefined) {
    if (props.hits !== undefined) {
      props.random.forEach(rand => {
        if (props.hits.indexOf(rand) !== -1) {
          balls.push({ number: rand, status: "ball-green" });
          //console.log("STATUS: ", balls);
        } else {
          balls.push({ number: rand, status: "ball-red" });
        }
      });
    }
  }

  if (props.random !== undefined) {
    const kenoBalls = balls.map((ball, index) => (
      //number.number < 41 ? section.top.push(number) : section.bottom.push(number)
      <KenoBallLast
        number={ball.number}
        status={ball.status}
        fade={props.fade}
        index={index}
        compStatus={props.status}
      />
    ));

    return kenoBalls;
  }

  return null;
};

export default KenoBallRackLast;
