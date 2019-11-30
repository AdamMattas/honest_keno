import React, { Component } from "react";

class KenoBall extends Component {
  state = { index: null };

  componentDidMount() {
    console.log("KENOBALL PROPS", this.props);
    const index = this.props.index + 1;
    setTimeout(() => {
      this.setState({ index });
    }, 0);
  }

  componentWillUnmount() {
    console.log("KENO BALL UNMOUNTING!");
  }

  render() {
    console.log("REMOVE STATUS: ", this.props.status);
    const numType = this.props.index % 2 ? "even-last" : "odd-last";
    const remove = this.props.fade ? "fade-trans fade-out" : "";

    return (
      <span
        className={`last-ball ${numType} last-ball-${this.state.index} ${remove} ${this.props.status} time-${this.state.index}`}
      >
        <span>{this.props.number}</span>
      </span>
    );
  }
}

export default KenoBall;
