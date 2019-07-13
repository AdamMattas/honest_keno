import React, { Component } from "react";
import calculator from "./workers/calculator";

class Display extends Component {
  state = { payTable: [] };

  // componentDidMount() {
  //   const payTable = calculator.payTable(this.props.marked);
  //   this.setState({ payTable });
  //   console.log("PayTable: ", payTable);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.marked !== nextProps.marked;
  // }

  // componentDidUpdate() {
  //   const payTable = calculator.payTable(this.props.marked);
  //   // const { marked } = this.props;
  //   // let payTable;
  //   // if (marked > 0) payTable = this.state.payTable[this.props.marked - 1];

  //   if (payTable) this.setState({ payTable });
  //   //this.setState({ payTable });
  // }

  // payLine = () => {
  //   const { payTable } = this.state;
  //   console.log("PAYLINE FUNCTION: ", payTable);
  //   if (payTable.length > 0 && this.props.marked > 0) {
  //     const payLines = payTable.map((pays, i) => {
  //       if (pays[i] !== 0) {
  //         console.log("PAYS: ", pays);
  //         return (
  //           <tr>
  //             <td>Win{pays[i]}</td>
  //             <td>Bet{pays[i + 1]}</td>
  //           </tr>
  //         );
  //       }
  //     });
  //     return payLines;
  //   }
  //   return <tr />;
  // };

  render() {
    const payTable = calculator.payTable(this.props.marked);

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
        <div>Bet: {this.props.bet}</div>
        <div>Marked: {this.props.marked}</div>
        <div>Hit: {this.props.hits}</div>
        <div>Credit: {this.props.credit}</div>
        <div>Won: {this.props.winnings}</div>
      </div>
    );
  }
}

export default Display;
