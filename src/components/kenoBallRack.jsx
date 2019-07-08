import React from "react";
import KenoBall from "./kenoBall";

const KenoBallRack = props => {
  console.log("Props Random: ", props.random);
  console.log("Props Hit: ", props.hit);

  if (props.random !== undefined) {
    const random = props.random.map(rand => (
      //number.number < 41 ? section.top.push(number) : section.bottom.push(number)
      <KenoBall number={rand} />
    ));

    return random;
  }

  return null;
};

export default KenoBallRack;
