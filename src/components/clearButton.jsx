import React, { Component } from "react";

class ClearButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.clear}>CLEAR</button>;
  }
}

export default ClearButton;
