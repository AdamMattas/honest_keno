import React, { Component } from "react";

class SpeedButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.betPlus}>
        SPEED >>>
      </span>
    );
  }
}

export default SpeedButton;
