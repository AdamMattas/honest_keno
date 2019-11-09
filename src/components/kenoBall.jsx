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

  componentDidUpdate() {
    //console.log("UPDATE", this.state.index);
    // const index = this.props.index + 1;
    // if (index !== this.state.index) this.setState({ index });
  }

  render() {
    //console.log("RANDOM: ", this.props);
    // const delay2 = setTimeout(() => {
    //   return this.props.index + 1;
    // }, 3000);
    return (
      <div className={`ball ball-${this.state.index} ${this.props.status}`}>
        <span>{this.props.number}</span>
      </div>
    );
  }
}

export default KenoBall;
