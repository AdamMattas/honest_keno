import React from "react";
import AddCreditButton from "./addCreditButton";
import BetMaxButton from "./betMaxButton";
import BetMinusButton from "./betMinusButton";
import BetPlusButton from "./betPlusButton";
import ClearButton from "./clearButton";
import DealButton from "./dealButton";
import QuickPickButton from "./quickPickButton";
import SpeedButton from "./speedButton";
import SimulateButton from "./simulateButton";

const Buttons = props => {
  return (
    <React.Fragment>
      <div className="button-container">
        <AddCreditButton add={props.add} creditHint={props.creditHint} />
        <BetMaxButton betMax={props.betMax} />
        <span className="bet-wrap">
          <BetMinusButton betMinus={props.betMinus} />
          <BetPlusButton betPlus={props.betPlus} betHint={props.betHint} />
        </span>
        <SpeedButton status={props.status} />
        <ClearButton status={props.status} clear={props.clear} />
        <QuickPickButton status={props.status} pick={props.pick} />
        <DealButton status={props.status} deal={props.deal} />
      </div>
      <div className="button-simulate">
        <SimulateButton simulate={props.simulate} />
      </div>
    </React.Fragment>
  );
};

export default Buttons;
