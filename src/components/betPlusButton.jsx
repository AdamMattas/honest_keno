import React, { Component } from "react";

class BetPlusButton extends Component {
  state = { ready: false };
  render() {
    const hint = this.props.betHint ? "button--hint-bet" : "";
    return (
      <span
        className={`button button--plus ${hint}`}
        onClick={this.props.betPlus}
      >
        <span>+</span>
      </span>
    );
  }
}

export default BetPlusButton;
