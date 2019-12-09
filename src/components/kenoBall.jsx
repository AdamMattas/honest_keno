import React, { Component } from "react";

class KenoBall extends Component {
  state = { index: null };

  componentDidMount() {
    // const index = 0;
    // this.setState({ index });
    //console.log("KENOBALL PROPS", this.props);
    const index = this.props.index + 1;
    // this.setState({ index });
    setTimeout(() => {
      this.setState({ index });
    }, 0);
  }

  componentWillUnmount() {
    //console.log("KENO BALL UNMOUNTING!");
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
