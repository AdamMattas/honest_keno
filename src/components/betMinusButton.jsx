import React, { Component } from "react";

class BetMinusButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.betMinus}>BET -</button>;
  }
}

export default BetMinusButton;
