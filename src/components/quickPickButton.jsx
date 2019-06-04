import React, { Component } from "react";

class QuickPickButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.pick}>QUICK PICK</button>;
  }
}

export default QuickPickButton;
