import React, { Component } from "react";

class ClearButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.clear}>
        CLEAR
      </span>
    );
  }
}

export default ClearButton;
