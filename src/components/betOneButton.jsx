import React, { Component } from "react";

class BetOneButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.bet}>BET ONE</button>;
  }
}

export default BetOneButton;
