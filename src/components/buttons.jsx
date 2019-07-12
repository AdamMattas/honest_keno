import React from "react";
import AddCreditButton from "./addCreditButton";
import BetMaxButton from "./betMaxButton";
import BetMinusButton from "./betMinusButton";
import BetPlusButton from "./betPlusButton";
import ClearButton from "./clearButton";
import DealButton from "./dealButton";
import QuickPickButton from "./quickPickButton";

const Buttons = props => {
  return (
    <div className="button-container">
      <BetPlusButton betPlus={props.betPlus} />
      <BetMinusButton betMinus={props.betMinus} />
      <BetMaxButton betMax={props.betMax} />
      <ClearButton clear={props.clear} />
      <AddCreditButton add={props.add} />
      <QuickPickButton pick={props.pick} />
      <DealButton deal={props.deal} />
    </div>
  );
};

export default Buttons;
