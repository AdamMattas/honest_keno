import React, { Component } from "react";

class Display extends Component {
  state = {};
  render() {
    return (
      <div>
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
