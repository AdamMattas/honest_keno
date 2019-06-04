import React, { Component } from "react";

class AddCreditButton extends Component {
  state = { ready: false };
  render() {
    return <button onClick={this.props.add}>ADD CREDITS</button>;
  }
}

export default AddCreditButton;
