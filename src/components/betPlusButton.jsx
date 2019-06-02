import React, { Component } from "react";

class BetPlusButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.betPlus}>BET +</button>;
  }
}

export default BetPlusButton;
