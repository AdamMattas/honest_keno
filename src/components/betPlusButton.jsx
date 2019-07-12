import React, { Component } from "react";

class BetPlusButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.betPlus}>
        BET +
      </span>
    );
  }
}

export default BetPlusButton;
