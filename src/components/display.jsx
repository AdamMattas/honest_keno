import React from "react";
import calculator from "./workers/calculator";

const Display = props => {
  const payTable = calculator.payTable(props.marked);

  return (
    <div className="display-wrap">
      <table>
        <tbody>
          <tr className="display-row-top">
            <th className="text-left">HITS</th>
            <th className="text-right">WIN</th>
          </tr>
          <React.Fragment>
            {payTable.map((pays, i) => {
              console.log("PAYS: ", pays);
              if (pays > 0) {
                const payProduct = props.bet ? props.bet : 1;
                return (
                  <tr id={payTable.indexOf(pays) + 1}>
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
          </React.Fragment>
        </tbody>
      </table>
      <div>Bet: {props.bet}</div>
      <div>Marked: {props.marked}</div>
      <div>Hit: {props.hits}</div>
      <div>Credit: {props.credit}</div>
      <div>Won: {props.winnings}</div>
    </div>
  );
};

export default Display;
