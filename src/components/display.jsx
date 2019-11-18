import React from "react";
import Credit from "./credit";
import calculator from "./workers/calculator";

const Display = props => {
  const payTable = calculator.payTable(props.marked);

  return (
    <div className="display-wrap">
      <table className="table-top">
        <tbody>
          <tr className="display-row-top">
            <th className="text-left">HIT</th>
            <th className="text-right">WIN</th>
          </tr>

          {payTable.map((pays, i) => {
            console.log("PAYS: ", pays);
            if (pays > 0) {
              const payProduct = props.bet ? props.bet : 1;
              const divId = payTable.indexOf(pays) + 1;
              return (
                <tr className={props.active === divId ? "pay" : ""} id={divId}>
                  <td className="text-left pay-text">
                    {payTable.indexOf(pays) + 1}
                  </td>
                  <td className="text-right pay-text">{pays * payProduct}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <table className="table-bottom">
        <tbody>
          <tr>
            <td className="text-left">BET:</td>
            <td className="text-right">{props.bet}</td>
          </tr>

          <tr>
            <td className="text-left">HIT:</td>
            <td className="text-right">{props.hits}</td>
          </tr>
          <tr>
            <td className="text-left">WON:</td>
            <td className="text-right">{props.winnings}</td>
          </tr>
        </tbody>
      </table>
      <Credit
        credit={props.credit}
        type={props.type}
        denom={props.denom}
        toggle={props.toggleCredits}
      />
    </div>
  );
};

export default Display;
