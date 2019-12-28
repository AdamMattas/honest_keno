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
    const numType = this.props.index % 2 ? "even" : "odd";

    return (
      <span
        className={`ball ${numType} ball-${this.state.index} ${this.props.status} time-${this.state.index}`}
      >
        <span>{this.props.number}</span>
      </span>
    );
  }
}

export default KenoBall;
