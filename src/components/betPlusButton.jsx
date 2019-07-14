import React, { Component } from "react";

class BetPlusButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button plus" onClick={this.props.betPlus}>
        <span>+</span>
      </span>
    );
  }
}

export default BetPlusButton;
