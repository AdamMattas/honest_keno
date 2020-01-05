import React, { Component } from "react";

class KenoBall extends Component {
  state = { index: null };

  componentDidMount() {
    //console.log("KENOBALL PROPS", this.props);
    const index = this.props.index + 1;
    setTimeout(() => {
      this.setState({ index });
    }, 0);
  }

  render() {
    //console.log("REMOVE STATUS: ", this.props.status);
    const ballType =
      this.props.index % 2 ? "last-ball--even-last" : "last-ball--odd-last";
    const remove = this.props.fade
      ? "last-ball--fade-trans last-ball--fade-out"
      : "";

    return (
      <span
        className={`last-ball ${ballType} last-ball--${this.state.index} ${remove} ${this.props.status}`}
      >
        <span>{this.props.number}</span>
      </span>
    );
  }
}

export default KenoBall;
