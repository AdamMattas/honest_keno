import React, { Component } from "react";

class DealButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.deal}>
        DEAL
      </span>
    );
  }
}

export default DealButton;
