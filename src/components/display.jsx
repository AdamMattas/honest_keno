import React from "react";
import calculator from "./workers/calculator";

const Display = props => {
  const payTable = calculator.payTable(props.marked);

  return (
    <div>
      <table className="display-wrap">
        <tbody>
          <tr>
            <th>Hits</th>
            <th>Win</th>
          </tr>
          {payTable.map((pays, i) => {
            console.log("PAYS: ", pays);
            if (pays > 0) {
              return (
                <tr>
                  <td>Hit{payTable.indexOf(pays) + 1}</td>
                  <td>Win{pays}</td>
                </tr>
              );
            } else {
              return <tr />;
            }
          })}
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
