import React, { Component } from "react";

class BetMaxButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.betMax}>
        BET MAX
      </span>
    );
  }
}

export default BetMaxButton;
