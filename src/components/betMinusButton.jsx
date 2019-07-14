import React, { Component } from "react";

class BetMinusButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button minus" onClick={this.props.betMinus}>
        <span>-</span>
      </span>
    );
  }
}

export default BetMinusButton;
