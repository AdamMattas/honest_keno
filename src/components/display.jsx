import React from "react";
import Credit from "./credit";
import calculator from "./workers/calculator";

const Display = props => {
  const payTable = calculator.payTable(props.marked);
  const hitDelay = props.hitDelayed ? ` ${props.hitDelayed}` : "";

  return (
    <div className="display">
      <table className="display__table">
        <tbody>
          <tr className="display__top">
            <th className="display__text-left display--top-text">
              HIT {hitDelay}
            </th>
            <th className="display__text-right display--top-text">WIN</th>
          </tr>

          {payTable.map((pays, i) => {
            console.log("PAYS: ", pays);
            if (pays > 0) {
              const payProduct = props.bet ? props.bet : 1;
              const divId = payTable.indexOf(pays) + 1;
              return (
                <tr
                  className={
                    props.active === divId
                      ? "display__pay-line display--pay"
                      : "display__pay-line"
                  }
                  id={divId}
                >
                  <td className="display__text-left">
                    {payTable.indexOf(pays) + 1}
                  </td>
                  <td className="display__text-right">{pays * payProduct}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <table className="display__table display--bottom">
        <tbody>
          <tr>
            <td className="display__text-left">BET</td>
            <td className="display__text-right">{props.bet}</td>
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
