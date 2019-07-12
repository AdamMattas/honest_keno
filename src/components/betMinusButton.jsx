import React, { Component } from "react";

class BetMinusButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.betMinus}>
        BET -
      </span>
    );
  }
}

export default BetMinusButton;
