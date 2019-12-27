import React, { Component } from "react";

class AddCreditButton extends Component {
  state = { ready: false };
  render() {
    const hint = this.props.creditHint ? " hint-credit" : "";
    return (
      <span className={`button${hint}`} onClick={this.props.add}>
        ADD CREDITS
      </span>
    );
  }
}

export default AddCreditButton;
