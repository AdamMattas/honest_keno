import React, { Component } from "react";

class QuickPickButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.pick}>
        QUICK PICK
      </span>
    );
  }
}

export default QuickPickButton;
