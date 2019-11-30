import React, { Component } from "react";

class KenoBall extends Component {
  state = { index: null };

  componentDidMount() {
    // const index = 0;
    // this.setState({ index });
    console.log("KENOBALL PROPS", this.props);
    const index = this.props.index + 1;
    //this.setState({ index });
    setTimeout(() => {
      this.setState({ index });
    }, 0);
  }

  componentWillUnmount() {
    console.log("KENO BALL UNMOUNTING!");
  }

  render() {
    //console.log("RANDOM: ", this.props);
    // const delay2 = setTimeout(() => {
    //   return this.props.index + 1;
    // }, 3000);
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
