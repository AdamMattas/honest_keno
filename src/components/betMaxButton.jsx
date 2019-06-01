import React, { Component } from "react";

class BetMaxButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.betMax}>BET MAX</button>;
  }
}

export default BetMaxButton;
