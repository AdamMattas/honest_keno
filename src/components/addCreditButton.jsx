import React, { Component } from "react";

class AddCreditButton extends Component {
  state = { ready: false };
  render() {
    return (
      <span className="button" onClick={this.props.add}>
        ADD CREDITS
      </span>
    );
  }
}

export default AddCreditButton;
