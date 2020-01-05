import React, { Component } from "react";

class SimulateButton extends Component {
  state = { selected: "", hit: "" };

  selected = event => {
    this.setState({ selected: event.target.value });
  };

  hit = event => {
    this.setState({ hit: event.target.value });
  };

  send = () => {
    const { selected, hit } = this.state;
    this.props.simulate(selected, hit);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Marked"
          onChange={this.selected}
        ></input>
        <input type="text" placeholder="Hit" onChange={this.hit}></input>

        <span className="button" onClick={this.send}>
          SIMULATE
        </span>
      </form>
    );
  }
}

export default SimulateButton;
