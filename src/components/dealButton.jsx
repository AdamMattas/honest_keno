import React, { Component } from "react";

class DealButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.deal}>DEAL</button>;
  }
}

export default DealButton;
