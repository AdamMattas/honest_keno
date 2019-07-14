import React from "react";
import AddCreditButton from "./addCreditButton";
import BetMaxButton from "./betMaxButton";
import BetMinusButton from "./betMinusButton";
import BetPlusButton from "./betPlusButton";
import ClearButton from "./clearButton";
import DealButton from "./dealButton";
import QuickPickButton from "./quickPickButton";
import SpeedButton from "./speedButton";

const Buttons = props => {
  return (
    <div className="button-container">
      <AddCreditButton add={props.add} />
      <span className="bet-wrap">
        <BetPlusButton betPlus={props.betPlus} />
        <BetMinusButton betMinus={props.betMinus} />
      </span>
      <BetMaxButton betMax={props.betMax} />
      <SpeedButton />
      <ClearButton clear={props.clear} />
      <QuickPickButton pick={props.pick} />
      <DealButton deal={props.deal} />
    </div>
  );
};

export default Buttons;
