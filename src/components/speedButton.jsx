import { Component } from "react";

class SpeedButton extends Component {
  state = { ready: false };
  render() {
    return (
      // eslint-disable-next-line react/prop-types
      <span className="button speed-button" onClick={this.props.betPlus}>
        SPEED &gt;&gt;&gt;
      </span>
    );
  }
}

export default SpeedButton;
