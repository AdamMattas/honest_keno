//import ReactCSSTransitionGroup from "react-addons-css-transition-group";
//import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { CSSTransitionGroup } from "react-transition-group";
import React, { Component } from "react";

class KenoBall extends Component {
  state = { index: null };

  componentDidMount() {
    // const index = 0;
    // this.setState({ index });
    console.log("KENOBALL PROPS", this.props);
    const index = this.props.index + 1;
    // this.setState({ index });
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
    const numType = this.props.index % 2 ? "even" : "odd";

    // const add = `ball add ${numType} ball-${this.state.index} ${this.props.status} time-${this.state.index}`;
    // const remove = `ball remove ${numType} ball-${this.state.index} ${this.props.status} time-${this.state.index}`;

    // const component = this.props.compStatus === "add" ? add : remove;

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
