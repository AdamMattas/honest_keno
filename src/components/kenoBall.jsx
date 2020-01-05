import React, { Component } from "react";

class KenoBall extends Component {
  state = { index: null };

  componentDidMount() {
    const index = this.props.index + 1;

    setTimeout(() => {
      this.setState({ index });
    }, 0);
  }

  render() {
    const ballType = this.props.index % 2 ? "ball--even" : "ball--odd";

    return (
      <span
        className={`ball ${ballType} ball--${this.state.index} ${this.props.status}`}
      >
        <span>{this.props.number}</span>
      </span>
    );
  }
}

export default KenoBall;
